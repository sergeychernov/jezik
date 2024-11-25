import { statSync, writeFileSync, readFileSync, rmSync } from "@zos/fs";

export class FileStorage {
    constructor(fileName = "", defaultData = {}) {
        this.DEFAULT_DATA = defaultData;
        this.fileName = fileName;
        this.contentObj = this.DEFAULT_DATA;
    }

  set(obj) {
    writeFileSync({
      path: this.fileName,
      data: JSON.stringify(obj),
      options: {
        encoding: "utf8",
      },
    });
  }

  has(){
    return statSync({
      path: this.fileName,
    }) !== undefined;
  }

  clear(){
    rmSync({
      path: this.fileName});
  }

  get() {
    const fStat = statSync({
      path: this.fileName,
    });
    if (fStat) {
      try {
        this.contentObj = JSON.parse(
          readFileSync({
            path: this.fileName,
            options: {
              encoding: "utf8",
            },
          })
        );
      } catch (error) {
        this.contentObj = this.DEFAULT_DATA;
      }
    }

    return this.contentObj;
  }
}
