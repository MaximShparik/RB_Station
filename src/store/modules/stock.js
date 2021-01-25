export default {
  state: {
    products: []
  },
  mutations: {
    Stock(state,data) {
      state.products = []
      data.objects.forEach((release)=> {
        if (release.productInfo) {

          let slug = {
            slug: release.publishedContent.properties.seo.slug,
            title: release.publishedContent.properties.coverCard.properties.title,
            models: []
          }

          release.productInfo.forEach((product)=> {

            let model = {
              url: 'https://www.nike.com/ru/launch/t/'+slug.slug,
              modelName: product.merchProduct.labelName,
              id: product.merchProduct.id,
              imageURL: product.imageUrls.productImageUrl,
              sizes: [],
              stock: []
            }
            // console.log(model)
            product.skus.forEach((sizeId)=> {
              let size = {}
              size[sizeId.nikeSize] = sizeId.id
              model.sizes.push(size)
            })

            product.availableSkus.forEach((skuStock)=> {
              let stock = {}
              stock[skuStock.skuId] = skuStock.level
              model.stock.push(stock)
            })
            slug.models.push(model)
          })
          state.products.push(slug)
        }
      })
    }
  },
  actions: {
    async FetchConfigs(ctx,params){
      let configs = await fetch('запрос к бэку для конфига'+params.key)
      configs = await configs.json()
      ctx.commit('UpdateConfigs',configs)
    },
    async GetProductId(ctx) {
      let url = new URL ('https://api.nike.com/product_feed/threads/v2/')
      url.searchParams.append('count','14')
      url.searchParams.append('filter','marketplace(RU)')
      url.searchParams.append('filter','language(ru)')
      url.searchParams.append('filter','channelId(010794e5-35fe-4e32-aaff-cd2c74f89d61)')

      const resp = await fetch(url.href);
      const text = await resp.text();
      const json = await JSON.parse(text)

      if (resp.status === 200) {
        ctx.commit('Stock',json)
      } else {
        throw new Error(`Error in fetch - ${resp.status}`)
      }
    }
  },
  getters: {
    GetStock(state){
      return state.products
    }
  }
}
