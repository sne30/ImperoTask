import React, { useEffect, useState } from "react";
import { Dimensions, FlatList, Image, ScrollView, Text, View } from "react-native";

const ImperoTask = () => {

  const [categoriesData, setCategoriesData] = useState('');
  const [subCategoriesData, setSubCategoriesData] = useState('');
  const windowWidth = Dimensions.get('window').width;

  useEffect(() => {
    catergoriesApiCall();
    subCatergoriesApiCall();
  }, []);

  const catergoriesApiCall = () => {
    const body = JSON.stringify({
      CategoryId: 56,
      PageIndex: 2
    });
    fetch('http://esptiles.imperoserver.in/api/API/Product/DashBoard', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: body,
    })
      .then((response) => response.json())
      .then((data) => {
        setCategoriesData(data.Result?.Category);
      })
      .catch((error) => {
        console.error('Error:', error);
      });

  };

  const subCatergoriesApiCall = () => {
    const body = JSON.stringify({
      CategoryId: 0,
      DeviceManufacturer: "Google",
      DeviceModel: "Android SDK built for x86",
      DeviceToken: " ",
      PageIndex: 1
    });
    fetch('http://esptiles.imperoserver.in/api/API/Product/DashBoard', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: body,
    })
      .then((response) => response.json())
      .then((data) => {
        setSubCategoriesData(data.Result?.Category);
      })
      .catch((error) => {
        console.error('Error:', error);
      });

  };

  return (
    <>
      <View style={{ backgroundColor: 'black', height: '10%', justifyContent: 'center' }}>
        <View style={{
          flexDirection: 'row', justifyContent: 'flex-end', marginBottom
            : 10
        }} >
          <Text style={{ color: 'white', marginRight: '22%' }}>ESPTILES</Text>
          <Image
            source={require('../ImperoTask/Assets/filterImage.png')}
            style={{ width: 25, height: 25, marginRight: 15 }}
          />
          <Image
            source={require('../ImperoTask/Assets/searchImage.png')}
            style={{ width: 25, height: 25, alignSelf: 'center', marginRight: 15 }}
          />
        </View>
        <FlatList
          style={{ alignSelf: 'center', position: 'absolute', bottom: 8 }}
          data={categoriesData}
          horizontal={true}
          renderItem={({ item }) => {
            return (
              <View>
                <Text style={{ fontSize: 20, color: 'white' }}>{[item.Name]}</Text>
              </View>
            )
          }}
        />
      </View>
      <View style={{ flex: 1, padding: 14 }}>
        <FlatList
          showsVerticalScrollIndicator={false}
          style={{ alignSelf: 'center' }}
          data={subCategoriesData}
          renderItem={({ item }) => {
            return (
              <View>
                {item.SubCategories && item.SubCategories.map((subItem: any, index: any) => (
                  <View style={{ marginTop: 15 }} key={index}>
                    <Text style={{ fontSize: 16, fontWeight: "bold", }}>{subItem.Name}</Text>
                    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                      <View style={{ flexDirection: 'row', marginTop: 8 }}>
                        {subItem.Product && subItem.Product.map((productItem: any, productIndex: any) => (
                          <View style={{ marginRight: 10, justifyContent: 'center', }} key={productIndex}>
                            <Image style={{ height: windowWidth * 0.3, width: windowWidth * 0.4, borderRadius: 5, alignSelf: 'center' }} source={{ uri: productItem.ImageName }} />
                            <Text style={{ fontSize: 10, marginTop: 5, alignSelf: 'center' }}>{productItem.Name}</Text>
                          </View>
                        ))}
                      </View>
                    </ScrollView>
                  </View>
                ))}
              </View>
            );
          }}
        />
      </View>
    </>
  )

}

export default ImperoTask;
