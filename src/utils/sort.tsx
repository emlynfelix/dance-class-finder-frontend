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
      if (!(this.sortConfig.key in a)) {
        return 0;
      }
      if (a[this.sortConfig.key] < b[this.sortConfig.key]) {
        return this.sortConfig.direction === 'ascending' ? -1 : 1;
      }
      if (a[this.sortConfig.key] > b[this.sortConfig.key]) {
        return this.sortConfig.direction === 'ascending' ? 1 : -1;
      }
      return 0;
    });
    this.fnUpdateData(sortableData);
  }

  requestSort(key: string): void {
    let direction = 'ascending';
    if (this.sortConfig.key == key && this.sortConfig.direction == 'ascending') {
      direction = 'descending';
    }
    this.fnSetConfig({
      key: key,
      direction: direction,
    });
    this.sort();
  }
}
   
