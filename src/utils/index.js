import config from "../assets/config.json";

export function getConfig(configName) {
  //   const data = await fetch(
  //     "https://staticoss.xhemj.work/emoji-editor.xhemj.com/config.json"
  //   );
  //   const config = await data.json();
  return config[configName];
}

// https://stackoverflow.com/questions/10420352/converting-file-size-in-bytes-to-human-readable-string
export function getReadableFileSizeString(fileSizeInBytes) {
  var i = -1;
  var byteUnits = [" KB", " MB", " GB", " TB", "PB", "EB", "ZB", "YB"];
  do {
    fileSizeInBytes /= 1024;
    i++;
  } while (fileSizeInBytes > 1024);

  return Math.max(fileSizeInBytes, 0.1).toFixed(1) + byteUnits[i];
}
