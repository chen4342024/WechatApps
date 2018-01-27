

class UploadItem {
  static STATUS = {
    none: 'none',
    uploading: 'uploading',
    fail: 'fail',
    done: 'done'
  };

  static defaultOption = {
    canDelete: false,
    percent: '0',
    status: 'none'
  }

  constructor(option) {
    this.option = { ...UploadItem.defaultData, ...option };
  }

  fail() {
    this.status = UploadItem.STATUS.fail;
  }

  done(canDelete = true) {
    this.status = UploadItem.STATUS.done;
    this.canDelete = canDelete;
  }

  uploading(progress) {
    this.status = UploadItem.STATUS.uploading;
    this.percent = progress;
  }

}


module.exports = UploadItem;