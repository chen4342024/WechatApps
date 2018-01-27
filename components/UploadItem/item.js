class UploadItem {
  static uuid = 1;

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
    let newOption = { ...UploadItem.defaultData, ...option };
    this.canDelete = newOption.canDelete;
    this.percent = newOption.percent;
    this.status = newOption.status;
    this.imgSrc = newOption.imgSrc;
    this.key = UploadItem.uuid++;
  }

  fail() {
    this.status = UploadItem.STATUS.fail;
    this.canDelete = true;
  }

  done(hash, canDelete = true) {
    this.hash = hash;
    this.status = UploadItem.STATUS.done;
    this.canDelete = canDelete;
  }

  uploading(progress) {
    this.status = UploadItem.STATUS.uploading;
    this.percent = progress;
  }

}


module.exports = UploadItem;