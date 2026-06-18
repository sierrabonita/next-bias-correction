type PagyMeta = {
  url_template: string;
  first_url: string;
  current_url: string;
  page_url: string;
  last_url: string;
  count: number;
  page: number;
  limit: number;
  last: number;
  in: number;
  from: number;
  to: number;
  options: {
    limit: number;
    limit_key: string;
    page_key: string;
    page: number;
    metadata: [];
    count: number;
  };
};

export type PaginatedResponse<T> = {
  data: T[];
  meta: PagyMeta;
};
