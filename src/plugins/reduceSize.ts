import { JsApi } from '../lib/jsapi';
import { Plugin } from './_types';

const widthAttr = `android:width`;
const heightAttr = `android:height`;

export function fn(item: JsApi) {
  if (!item.isElem() || !item.attrs) {
    return item;
  }
  if (item.isElem('vector') && item.hasAttr(widthAttr) && item.hasAttr(heightAttr)) {

    const width = +item.attr(widthAttr).value.replace("dp", "")
    const height = +item.attr(heightAttr).value.replace("dp", "")

    if (width > 200) {
      const finalHeight = Math.round(200 * height / width)

      item.attr(widthAttr).value = '200dp'
      item.attr(heightAttr).value = `${finalHeight}dp`
    }

    if (height > 200) {
      const finalWidth = Math.round(200 * width / height)

      item.attr(heightAttr).value = '200dp'
      item.attr(widthAttr).value = `${finalWidth}dp`
    }
  }

  return item;
}


export const fixHeightPlugin: Plugin<undefined> = {
  type: 'perItemReverse',
  active: true,
  description: 'removes empty groups',
  params: undefined,
  fn,
};
