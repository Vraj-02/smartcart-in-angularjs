export const environment = {
    baseUrl: "http://localhost:1337/",

    login: 'api/auth/local',

    register: 'api/auth/local/register',

    // user_detail:
    // 'api/users/me?populate[0]=user_addresses&populate[1]=user_addresses.city',

    user_detail:
    'api/users/me?populate[0]=user_addresses&populate[1]=user_addresses.city&populate[2]=user_addresses.city.state',

    // all_products:
    // 'api/products?pagination[page]=1&pagination[pageSize]=100&populate[category][fields][0]=category_name&populate[product_image][fields][1]=url&filters[product_name][$containsi][0]=wa&filters[category][id][$eqi][1]=2',

    all_products:
    'api/products?pagination[page]=1&pagination[pageSize]=100&populate[category][fields][0]=category_name&populate[product_image][fields][1]=url',

    cartUrl: 'http://localhost:1337/api/carts',

    // getUserCartUrl: `http://localhost:1337/api/carts?filters[user_detail][id][$eq][0]=${userId}&populate=product&filters[order][id][$notNull]`;

    orderUrl: 'http://localhost:1337/api/orders',

    getorderUrl :'http://localhost:1337/api/orders?fields=%2A&populate=%2A',

    getAddressUrl:
    'http://localhost:1337/api/users/me?populate[0]=user_addresses&populate[1]=user_addresses.city',

    userAddressUrl: 'http://localhost:1337/api/user-addresses',

    getCityByStateUrl:
      'http://localhost:1337/api/cities?populate=state&filters[state][id][$eq]=',
    getAllStatesUrl: 'http://localhost:1337/api/states',
  
    getAllProductsUrl:
      'http://localhost:1337/api/products?pagination[page]=1&pagination[pageSize]=10&populate[category][fields][0]=category_name&populate[product_image][fields][1]=url&populate[wish_lists][fields][2]=id',
};
