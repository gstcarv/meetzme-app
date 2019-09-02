const isEventInited = (event) => {
  if (new Date(Date.now()) >= event.initTrackingDatetime) {
    return true;
  } else {
    return false;
  }
}

export { isEventInited }