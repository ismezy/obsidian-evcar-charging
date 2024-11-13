import { TextFileView } from "obsidian";
import ListView from "./views/List.svelte";
import { mount, unmount } from "svelte";

export const VIEW_TYPE_CSV = "csv-view";

export class CSVView extends TextFileView {
  listView: Record<string, any>;

  protected onOpen(): Promise<void> {
    this.listView = mount(ListView, { target: this.contentEl, props: { data: this.data, variable: 1 } });

    return super.onOpen();
  }

  protected onClose(): Promise<void> {
    unmount(this.listView);
    return super.onClose();
  }

  getViewData() {
    return this.data;
  }

  setViewData(data: string, clear: boolean) {
    // this.data = data;
    // this.contentEl.empty();
    // this.contentEl.createDiv({ text: this.data });
  }

  clear() {
    this.data = "";
  }

  getViewType() {
    return VIEW_TYPE_CSV;
  }
}
