const apiKey = 'tu2Kt_c4iOUu0Yl_TQVvHunS-8S_uaoQZ_w6ve-xNoYTACTJcUv7yiFrUdypMxThmYtqHos8SSUsA92FkNYRzOK7Ji9e0ie4zxv72YSG1C71W5U45d6hiiFCebPeWnYx';

const Yelp = {
  search (term, location, sortBy) {
    return fetch(`https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=${term}&location=${location}&sort_by=${sortBy}`,{
      headers: {Authorization: `Bearer ${apiKey}`}
    }).then(response => {
      if(response.ok) {return response.json();} else {
        throw new Error('Request Failed!');
      }
    }).then(jsonResponse => {
      if(jsonResponse.businesses) {
        return jsonResponse.businesses.map(business => (
          {
            id: business.id,
            imageSrc: business.img_url,
            name: business.name,
            address: business.location.address1,
            city: business.location.city,
            state: business.location.state,
            zipCode: business.location.zip_code,
            category: business.categories[0].title,
            rating: business.rating,
            reviewCount: business.review_count
          }
        ));
      }
    });
  }
}

export default Yelp;
