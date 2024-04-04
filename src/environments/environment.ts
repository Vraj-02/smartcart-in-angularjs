export const environment = {
    baseUrl: "http://localhost:1337/",

    login: 'api/auth/local',

    register: 'api/auth/local/register',

    // user_detail:
    // 'api/users/me?populate[0]=user_addresses&populate[1]=user_addresses.city',

    user_detail:
    'api/users/me?populate[0]=user_addresses&populate[1]=user_addresses.city&populate[2]=user_addresses.city.state',

    // all_products:
    // 'api/products?pagination[page]=1&pagination[pageSize]=100&populate[category][fields][0]=category_name&populate[product_image][fields][1]=url',


    all_products:
    'api/products?pagination[page]=1&pagination[pageSize]=100&populate[category][fields][0]=category_name&populate[product_image][fields][1]=url'
};