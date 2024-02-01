/* eslint-disable @typescript-eslint/no-explicit-any */
export interface QSelectOptions {
  label: string;
  value: string | Date | number | boolean;
}

export type OnRequestParameter = {
  pagination: {
    sortBy: string;
    descending: boolean;
    page: number;
    rowsPerPage: number;
    rowsNumber: number;
    totalPages: number;
  };
  filter?: string | any;
  getCellValue: (col: any, row: any) => any;
};
