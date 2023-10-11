export interface SortConfig{
  direction: string,
  key: string,
}

export class Sort {
  sortConfig: SortConfig
  fnSetConfig: any
  currentData: any
  fnUpdateData: any

  constructor(config: SortConfig, setConfig: any, data: any, updateData: any){
    this.sortConfig = config;
    this.fnSetConfig = setConfig;
    this.currentData = data;
    this.fnUpdateData = updateData;
  }

  sort(): void {
    let sortableData = [...this.currentData];
    sortableData.sort((a: any, b: any) => {
      const sortKeys: string[] = this.sortConfig.key.split(".");
      var a_val: any = {...a};
      var b_val: any = {...b};
      sortKeys.forEach((key) => {
        if (!(key in a_val) || !(key in b_val)) {
          return 0;
        }
        a_val = a_val[key];
        b_val = b_val[key];
      });
        
      if (a_val < b_val) {
        return this.sortConfig.direction === 'ascending' ? -1 : 1;
      }
      if (a_val > b_val) {
        return this.sortConfig.direction === 'ascending' ? 1 : -1;
      }
      return 0;
    });
    this.fnUpdateData(sortableData);
  }

  requestSort(key: string): void {
    let direction = 'ascending';
    if (this.sortConfig.key === key && this.sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    this.fnSetConfig({
      key: key,
      direction: direction,
    });
    this.sort();
  }
}
   
