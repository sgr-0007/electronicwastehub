export const CexService = {

    getCexLink() {

        return [
            {
              device: "Apple iPhone XR",
              price: 175.00,
              cexlink: "https://uk.webuy.com/product-detail/?id=sappixr64gbunlb&categoryName=iphones&superCatName=phones&title=&queryID=016019c80e1ec53eac4d42b8b29c9700&position=2"
            },
            {
              device: "Apple iPhone 11",
              price: 240.00,
              cexlink: "https://uk.webuy.com/product-detail?id=sappi1164gbunlb&categoryName=iphones&superCatName=phones&title=&queryID=da0ddafbaaa115ad3bd7dedbb08329a7&position=1"
            },
            {
              device: "Apple iPhone SE",
              price: 160.00,
              cexlink: "https://uk.webuy.com/product-detail?id=sappipse264gbunlb&categoryName=iphones&superCatName=phones&title=&queryID=6915cdc49a37696682d4358ea97d9852&position=4"
            },
            {
              device: "Apple iPhone 12",
              price: 300.00,
              cexlink: "https://uk.webuy.com/product-detail?id=sappi1264gbunlb&categoryName=iphones&superCatName=phones&title=&queryID=693e781133a0ac8e8cad1e55ccb7f299&position=5"
            },
            {
              device: "Apple iPhone 13",
              price: 410.00,
              cexlink: "https://uk.webuy.com/product-detail?id=sappi13128gmunlb&categoryName=iphones&superCatName=phones&title=&queryID=9aee5a1405588ddebb4114b51ffbcc19&position=10"
            },
            {
              device: "Samsung Galaxy A14",
              price: 160.00,
              cexlink: "https://uk.webuy.com/product-detail?id=ssama145r64gbunlb&categoryName=android-phones&superCatName=phones&title=&queryID=74b8eedc0b3c37ed74200cd2f40d15fc&position=12"
            },
            {
              device: "Samsung Galaxy A20e",
              price: 95.00,
              cexlink: "https://uk.webuy.com/product-detail?id=ssamsma202ds32gbunlb&categoryName=android-phones&superCatName=phones&title=&queryID=15d629913d02fd550a607d801a8dae6e&position=16"
            },
            {
              device: "Samsung Galaxy S21",
              price: 255.00,
              cexlink: "https://uk.webuy.com/product-detail?id=ssamg991d128ggunlb&categoryName=android-phones&superCatName=phones&title=&queryID=4852db6a1f40899b4ffd2cc1dcd27556&position=13"
            },
            {
              device: "Google Pixel 6",
              price: 220.00,
              cexlink: "https://uk.webuy.com/product-detail?id=sgogpix6128gsbunlb&categoryName=android-phones&superCatName=phones&title=&queryID=1da43528609e95dd403f736cc04dbe58&position=22"
            },
            {
              device: "Samsung Galaxy A13",
              price: 140.00,
              cexlink: "https://uk.webuy.com/product-detail?id=ssama135fd464gbkunlb&categoryName=android-phones&superCatName=phones&title=&queryID=0e1abfff50b55bbe1bfde6afd03d87b4&position=33"
            },
            {
              device: "Dell XPS 15",
              price: 615.00,
              cexlink: "https://uk.webuy.com/product-detail?id=slapdel975011b&categoryName=laptops-windows&superCatName=computing&title=&queryID=ac77b759f45413c276b4e1d0a6372565&position=5"
            },
            {
              device: "Lenovo X390",
              price: 165.00,
              cexlink: "https://uk.webuy.com/product-detail?id=slaplenx390128b&categoryName=laptops-windows&superCatName=computing&title=&queryID=873d279a1db0c67c6ddaa608201c2d65&position=15"
            },
            {
              device: "Microsoft Surface Book",
              price: 495.00,
              cexlink: "https://uk.webuy.com/product-detail?id=slapmicsurboo2416b&categoryName=laptops-windows&superCatName=computing&title=&queryID=53cc55c9593e506711f9301eafd7e290&position=17"
            }
          ]
    },

    getCexLinkUrl() {
        return Promise.resolve(this.getCexLink());

    },
    
};