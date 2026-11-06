import {
  Injectable,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Pool } from 'pg';
import { getProjectorPostgresUrl } from '../../database/postgres.config';
import {
  DebeziumPayload,
  rowId,
  rowMovieId,
  rowPersonId,
} from './cdc-payload.util';
import {
  TABLE_TO_SECTION,
  TitleProjectionSection,
} from './full-relations';

const MOVIE_ID_TABLES = new Set([
  'cast_info',
  'aka_title',
  'movie_companies',
  'movie_info',
  'movie_info_idx',
  'movie_keyword',
  'movie_link',
  'complete_cast',
]);

const PERSON_ID_TABLES = new Set(['name', 'person_info']);

const LOOKUP_SKIP = new Set([
  'kind_type',
  'char_name',
  'role_type',
  'info_type',
  'company_name',
  'company_type',
  'keyword',
  'link_type',
  'comp_cast_type',
]);

export type CdcProjectionAction =
  | { type: 'rebuild'; titleIds: number[] }
  | {
      type: 'rebuildSection';
      titleIds: number[];
      section: TitleProjectionSection;
    }
  | {
      type: 'patchTitle';
      titleId: number;
      fields: Record<string, unknown>;
    }
  | { type: 'delete'; titleId: number }
  | { type: 'noop' };

@Injectable()
export class TitleIdResolver implements OnModuleInit, OnModuleDestroy {
  private pool!: Pool;

  constructor(private readonly config: ConfigService) {}

  onModuleInit(): void {
    this.pool = new Pool({
      connectionString: getProjectorPostgresUrl(this.config),
    });
  }

  async onModuleDestroy(): Promise<void> {
    await this.pool?.end();
  }

  async resolve(
    table: string,
    payload: DebeziumPayload,
  ): Promise<CdcProjectionAction> {
    if (LOOKUP_SKIP.has(table)) {
      return { type: 'noop' };
    }

    const op = payload.op;
    const after = payload.after ?? null;
    const before = payload.before ?? null;

    if (table === 'title') {
      if (op === 'd') {
        const id = rowId(before);
        return id != null
          ? { type: 'delete', titleId: id }
          : { type: 'noop' };
      }
      const id = rowId(after) ?? rowId(before);
      if (id == null) return { type: 'noop' };

      // Snapshot / create → full slim rebuild. Live update → scalar patch.
      if (op === 'u' && after) {
        return { type: 'patchTitle', titleId: id, fields: after };
      }
      return { type: 'rebuild', titleIds: [id] };
    }

    if (MOVIE_ID_TABLES.has(table)) {
      const ids = new Set<number>();
      const a = rowMovieId(after);
      const b = rowMovieId(before);
      if (a != null) ids.add(a);
      if (b != null) ids.add(b);
      if (table === 'movie_link') {
        for (const row of [after, before]) {
          const linked = row?.linked_movie_id;
          if (typeof linked === 'number') ids.add(linked);
          if (typeof linked === 'string' && linked !== '') {
            ids.add(Number(linked));
          }
        }
      }
      if (!ids.size) return { type: 'noop' };

      const section = TABLE_TO_SECTION[table];
      if (!section) {
        return { type: 'rebuild', titleIds: [...ids] };
      }
      return {
        type: 'rebuildSection',
        titleIds: [...ids],
        section,
      };
    }

    if (PERSON_ID_TABLES.has(table)) {
      const personIds = new Set<number>();
      if (table === 'name') {
        const id = rowId(after) ?? rowId(before);
        if (id != null) personIds.add(id);
      } else {
        const id = rowPersonId(after) ?? rowPersonId(before);
        if (id != null) personIds.add(id);
      }
      const titleIds = new Set<number>();
      for (const personId of personIds) {
        for (const movieId of await this.movieIdsForPerson(personId)) {
          titleIds.add(movieId);
        }
      }
      // Person rename touches castInfos.person — section refresh is enough
      return titleIds.size
        ? {
            type: 'rebuildSection',
            titleIds: [...titleIds],
            section: 'castInfos',
          }
        : { type: 'noop' };
    }

    return { type: 'noop' };
  }

  private async movieIdsForPerson(personId: number): Promise<number[]> {
    const result = await this.pool.query<{ movie_id: number }>(
      'select distinct movie_id from cast_info where person_id = $1',
      [personId],
    );
    return result.rows.map((r) => Number(r.movie_id));
  }
}
