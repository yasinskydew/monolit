export type EntityClass<T = object> = new (...args: never[]) => T;

export type RelationsTree = {
  [key: string]: true | RelationsTree;
};

export type FindAllParams = {
  skip?: number;
  take?: number;
  relations?: RelationsTree;
  orderBy?: string;
  order?: 'ASC' | 'DESC';
};

export interface CrudRepository<T extends { id: number }> {
  findAll(params?: FindAllParams): Promise<T[]>;
  findById(id: number, relations?: RelationsTree): Promise<T | null>;
  create(data: Partial<T> | object): Promise<T>;
  update(id: number, data: Partial<T> | object): Promise<T>;
  remove(id: number): Promise<void>;
}
