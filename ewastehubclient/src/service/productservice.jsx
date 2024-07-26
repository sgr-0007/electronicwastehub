export const ProductService = {
    getProductsData() {
        return [

            {
                id: '2001',
                owner: 'Olivia Johnson',
                brand: 'Sony',
                model: 'Bravia X900H',
                image: 2,
                price: 1099,
                type: 'Television',
                class: 'Current',
                status: 'Received',
                isActive: true,
                rating: 4.7,
              },
              {
                id: '2002',
                owner: 'Ethan Hunt',
                brand: 'Apple',
                model: 'MacBook Pro',
                image: 1,
                price: 1499,
                type: 'Laptop',
                class: 'Current',
                status: 'Data Wiped',
                isActive: false,
                rating: 4.9,
              },
              {
                id: '2003',
                owner: 'John Doe',
                brand: 'Amazon',
                model: 'Echo Dot (4th Gen)',
                image: 3,
                price: 49,
                type: 'Smart Speaker',
                class: 'Unknown',
                status: 'Data Retrieved',
                isActive: true,
                rating: 4.5,
              },
              {
                id: '2004',
                owner: 'Mary Johnson',
                brand: 'Samsung',
                model: 'Galaxy S21',
                image: 4,
                price: 799,
                type: 'Smartphone',
                class: 'Recycle',
                status: 'Received',
                isActive: false,
                rating: 4.8,
              },
              {
                id: '2005',
                owner: 'Chris Dale',
                brand: 'Sony',
                model: 'PlayStation 5',
                image: 5,
                price: 499,
                type: 'Gaming Console',
                class: 'Rare',
                status: 'Data Wiped',
                isActive: false,
                rating: 4.9,
              },
              {
                id: '20011',
                owner: 'Matthew Johnson',
                brand: 'Sony',
                model: 'Bravia X900H',
                image: 2,
                price: 1099,
                type: 'Television',
                class: 'Current',
                status: 'Received',
                isActive: false,
                rating: 4.7,
              },
              {
                id: '20022',
                owner: 'Grace Hunt',
                brand: 'Apple',
                model: 'MacBook Pro',
                image: 1,
                price: 1499,
                type: 'Laptop',
                class: 'Current',
                status: 'Data Wiped',
                isActive: false,
                rating: 4.9,
              },
              {
                id: '20033',
                owner: 'Malcolm Doe',
                brand: 'Amazon',
                model: 'Echo Dot (4th Gen)',
                image: 3,
                price: 49,
                type: 'Smart Speaker',
                class: 'Unknown',
                status: 'Data Retrieved',
                isActive: false,
                rating: 4.5,
              },
              {
                id: '20044',
                owner: 'Megan Johnson',
                brand: 'Samsung',
                model: 'Galaxy S21',
                image: 4,
                price: 799,
                type: 'Smartphone',
                class: 'Recycle',
                status: 'Received',
                isActive: false,
                rating: 4.8,
              },
              {
                id: '20054',
                owner: 'David Dale',
                brand: 'Sony',
                model: 'PlayStation 5',
                image: 5,
                price: 499,
                type: 'Gaming Console',
                class: 'Rare',
                status: 'Data Wiped',
                isActive: false,
                rating: 4.9,
              },
              
        ];
    },



    getProductsMini() {
        return Promise.resolve(this.getProductsData().slice(0, 5));
    },

    getProductsSmall() {
        return Promise.resolve(this.getProductsData().slice(0, 10));
    },

    getProducts() {
        return Promise.resolve(this.getProductsData());
    }
};

