import {
  App,
  Editor,
  FileManager,
  MarkdownView,
  MenuItem,
  Modal,
  Notice,
  Plugin,
  PluginSettingTab,
  Setting,
  TFolder,
} from "obsidian";
import { CSVView, VIEW_TYPE_CSV } from "./view";

// Remember to rename these classes and interfaces!

interface MyPluginSettings {
  mySetting: string;
}

const DEFAULT_SETTINGS: MyPluginSettings = {
  mySetting: "default",
};

export default class MyPlugin extends Plugin {
  settings: MyPluginSettings;
  menuItemAdded: boolean = false;

  async onload() {
    await this.loadSettings();
    this.app.workspace.on("file-menu", (menu, file) => {
      // 判断是否文件夹
      if (file instanceof TFolder && !this.menuItemAdded) {
        this.menuItemAdded = true;
        menu.addItem((item) => {
          item
            .setTitle("Create CSV")
            .setIcon("csv")
            .onClick(() => this.createCsv(file as TFolder));
        });
      }
    });

    // This adds a status bar item to the bottom of the app. Does not work on mobile apps.
    // const statusBarItemEl = this.addStatusBarItem();
    // statusBarItemEl.setText('Status Bar Text');

    // This adds a simple command that can be triggered anywhere

    this.registerView(VIEW_TYPE_CSV, (leaf) => new CSVView(leaf));
    this.registerExtensions(["csv"], VIEW_TYPE_CSV);
  }

  onunload() {}

  async createCsv(folder: TFolder, index: number = 0) {
    const path = `${folder.path}/未命名${index ? index : ""}.csv`;
    const file = this.app.vault.getAbstractFileByPath(path);
    if (!file) {
      await this.app.vault.create(path, "a,b,c\n1,2,3\n4,5,6");
    } else {
      this.createCsv(folder, index + 1);
    }
  }

  async loadSettings() {
    this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
  }

  async saveSettings() {
    await this.saveData(this.settings);
  }
}

class SampleModal extends Modal {
  constructor(app: App) {
    super(app);
  }

  onOpen() {
    const { contentEl } = this;
    contentEl.setText("Woah!");
  }

  onClose() {
    const { contentEl } = this;
    contentEl.empty();
  }
}

class SampleSettingTab extends PluginSettingTab {
  plugin: MyPlugin;

  constructor(app: App, plugin: MyPlugin) {
    super(app, plugin);
    this.plugin = plugin;
  }

  display(): void {
    const { containerEl } = this;

    containerEl.empty();

    new Setting(containerEl)
      .setName("Setting #1")
      .setDesc("It's a secret")
      .addText((text) =>
        text
          .setPlaceholder("Enter your secret")
          .setValue(this.plugin.settings.mySetting)
          .onChange(async (value) => {
            this.plugin.settings.mySetting = value;
            await this.plugin.saveSettings();
          }),
      );
  }
}
