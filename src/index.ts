import type { RemarkOptions } from 'remark'
import type { Plugin } from 'unified'
import type { Node } from 'unist'
import visit from 'unist-util-visit-parents'

const isRelativeImage = (str: string) =>
  str.match(/\.\/(.*?.(svg|png|jpg|jpeg|gif)$)/)
const isRelative = (str: string) => str.match(/\.\/(.*?$)/)

interface Option {
  basePath: string
  baseImagePath?: string
}

const basePath: Plugin<[Option], Partial<RemarkOptions>> = ({
  basePath,
  baseImagePath,
}) => (tree) =>
  visit(tree, ['image', 'link'], (node: { url: string } & Node, parents) => {
    // console.log('node: ', node)
    // console.log('parents: ', parents)
    const image = isRelativeImage(node.url)
    if (image) {
      const siblings: any = parents[parents.length - 1].children
      siblings[siblings.indexOf(node)] = {
        ...node,
        url: `${baseImagePath || basePath}/${image[1]}`,
      }
      return
    }

    const url = isRelative(node.url)
    if (url) {
      const siblings: any = parents[parents.length - 1].children
      siblings[siblings.indexOf(node)] = {
        ...node,
        url: `${basePath}/${url[1]}`,
      }
      return
    }
  })

export default basePath
