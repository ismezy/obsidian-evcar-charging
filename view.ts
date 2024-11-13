import { TextFileView } from "obsidian";
import ListView from "./views/List.svelte";
import { mount, unmount } from "svelte";

export const VIEW_TYPE_CSV = "csv-view";

export class CSVView extends TextFileView {
  listView: Record<string, any>;


  getViewData() {
    return this.data;
  }

  setViewData(data: string, clear: boolean) {
	  // this.contentEl.empty();
	  // this.contentEl.createDiv(data);
	  // this.listView.$set({ data: this.data });
	  if(this.listView) {
		  unmount(this.listView);
	  }
	  this.listView = mount(ListView, { target: this.contentEl, props: { data} });
	  this.data = data;
  }

  clear() {
    this.data = "";
  }

  getViewType() {
    return VIEW_TYPE_CSV;
  }
}
