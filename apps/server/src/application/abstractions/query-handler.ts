import { IQuery } from "./query";

export interface IQueryHandler<TQuery extends IQuery<TResponse>, TResponse> {
    handle(query: TQuery): Promise<TResponse>;
}


