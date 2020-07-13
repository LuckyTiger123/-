const repleaceTags = (str) => {
  return str.replace(/<em>/g, "<span>").replace(/<\/em>/g, "</span>");
};

export const processRawData = (data) => {
  const newData = [];
  data.forEach((item) => {
    let resourceContent = JSON.parse(item);

    // let resourceContent = JSON.parse(item.source);
    // const highlightTitle = item.highlight.title
    //   ? item.highlight.title.field
    //   : null;
    // const highlightInfo = item.highlight.info
    //   ? item.highlight.info.field
    //   : null;

    // const newTitle = highlightTitle
    //   ? highlightTitle.reduce((prev, cur) => prev + repleaceTags(cur), "")
    //   : resourceContent.title;
    // const newInfo = highlightInfo
    //   ? highlightInfo.reduce((prev, cur) => prev + repleaceTags(cur), "")
    //   : resourceContent.info;

    const newUrl =
      resourceContent.url.indexOf("http") === -1
        ? "http://" + resourceContent.url
        : resourceContent.url;

    newData.push({
      ...resourceContent,
      // title: newTitle,
      // info: newInfo,
      url: newUrl,
    });
  });
  return newData;
};
