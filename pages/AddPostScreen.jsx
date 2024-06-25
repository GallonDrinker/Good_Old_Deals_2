import { StyleSheet, View, Text, Button, Image, ToastAndroid, Alert, ActivityIndicator, KeyboardAvoidingView, ScrollView } from 'react-native'

import React, { useEffect, useState } from 'react'
import { collection, getFirestore, getDocs,addDoc } from "firebase/firestore"
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { app } from './../FirebaseConfig';
import { Formik } from 'formik';
import { TextInput,TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import * as ImagePicker from 'expo-image-picker';
import { useUser } from '@clerk/clerk-expo';

export default function AddPostScreen() {

    const [image, setImage] = useState(null);
    const db = getFirestore(app);
    const storage = getStorage();
    const [loading, setLoading] = useState(false);
    const [categoryList, setCategoryList] = useState([]);
    const {user} = useUser();

    useEffect(() => {
        getCategoryList();
    }, [])
    
    const getCategoryList = async () => {
        setCategoryList([]);
        const querySnapshot = await getDocs(collection(db,'Category'));

        querySnapshot.forEach((doc) => {
            console.log("Docs:", doc.data());
            setCategoryList(categoryList => [...categoryList, doc.data()])
        })
    }


        /**
     * Local Storage image picker code
     */
        const pickImage = async () => {
            // No permissions request is necessary for launching the image library
            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.All,
                allowsEditing: true,
                aspect: [16, 9],
                quality: 1,
            });
    
            console.log(result);
    
            if (!result.canceled) {
                setImage(result.assets[0].uri);
            }
        };


        const onSubmitMethod = async (value) => {
            //value.image = image;
            // console.log(value)
            /**
             * Converting uri to Blob File
             */
            setLoading(true)
    
            const resp = await fetch(image);
            const blob = await resp.blob();
            const storageRef = ref(storage, 'communityPost/' + Date.now() + ".jpg");
    
            // 'file' comes from the Blob or File API
            uploadBytes(storageRef, blob).then((snapshot) => {
                console.log('Uploaded a blob or file!');
            }).then((resp) => {
                getDownloadURL(storageRef).then(async (downloadUrl) => {
                    console.log(downloadUrl);
                    value.image = downloadUrl;
                     value.userName = user.fullName;
                     value.userEmail = user.primaryEmailAddress.emailAddress;
                     value.userImage = user.imageUrl;
    
                    const docRef = await addDoc(collection(db, "UserPost"), value)
                    if (docRef.id) {
                        setLoading(false);
                        Alert.alert('Success!!!', 'Post Added Successfully.')
                        console.log("Document Added!!")
                    }
                })
            });
        }
        
  return (
    <KeyboardAvoidingView>
    < ScrollView className="p-4">
        <Text className="text-[27px] font—bold">Add New Post</Text>
        <Text className="text-[18px] text-lime-800 mb-7">Create New Post and Start Selling</Text>
      <Formik
      initialValues={{ title: '', desc: '', category: '', address: '', price: '', image: '', userName: '', userEmail: '', userImage: '', createdAt:Date.now() }}
      onSubmit={value => onSubmitMethod(value)}
      validate={(values) => {
          const errors = {}
          if (!values.title) {
              console.log("Title not present");
              ToastAndroid.show('Title must be filled', ToastAndroid.SHORT)
              errors.name = "Title must be filled"
          }
          return errors
      }}
      >
        {({ handleChange, handleBlur, handleSubmit, values, setFieldValue, errors }) => (
            <View>
                <TouchableOpacity onPress={pickImage}>
                            {/* <TouchableOpacity onPress={()=>console.log("image click")}> */}
                            {image ?
                                <Image source={{ uri: image }} style={{ width: 180, height: 100, borderRadius: 15 }} />
                                :
                                <Image source={require('./../assets/images/image_placeholder.png')}
                                    // <Image source={require('I:/2.MAD_TEST/AwesomeProject/assets/images/image_placeholder.PNG')}
                                    style={{ width: 180, height: 100, borderRadius: 15 }}
                                />
                            }

                        </TouchableOpacity>
                <TextInput
                            style={styles.input}
                            placeholder='Title'
                            value={values?.title}
                            onChangeText={handleChange('title')}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder='Description'
                            value={values?.desc}
                            numberOfLines={5}
                            onChangeText={handleChange('desc')}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder='Price'
                            value={values?.price}
                            keyboardType='number-pad'
                            onChangeText={handleChange('price')}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder='Address'
                            value={values?.address}
                            // keyboardType='number-pad'
                            onChangeText={handleChange('address')}
                        />
                        <View style={{ borderWidth: 1, borderRadius: 10, marginTop: 15 }}>
                            <Picker
                                selectedValue={values?.category}
                                className="border-2"
                                onValueChange={itemValue => setFieldValue('category', itemValue)}
                            >
                                {categoryList.length > 0 && categoryList?.map((item, index) => (
                                    <Picker.Item key={index}
                                        label={item?.name} value={item?.name} />
                                ))}
                                {/* <Picker.Item label='Dropdown1' value={'Dropdown'}/>  */}
                                {/* Remove this upper 1 line for db data load  */}
                            </Picker>
                        </View>
                        <TouchableOpacity onPress={handleSubmit}
                            style={{
                                backgroundColor: loading ? '#ccc' : '#02d170',

                            }}
                            disabled={loading}
                            className="p-5 rounded-full mt-3">
                            {
                                loading ?
                                    <ActivityIndicator color='#fff' />
                                    :
                                    <Text className="text-slate-800 text-center text-[16px]">Submit</Text>

                            }

                        </TouchableOpacity>
            </View>
            )}
      </Formik>
    </ScrollView>
    </KeyboardAvoidingView>
  )
}
const styles = StyleSheet.create({
    input: {
        borderWidth: 1,
        borderRadius: 10,
        padding: 10,
        paddingTop: 15,
        marginTop: 10,
        marginBottom: 5,
        paddingHorizontal: 17,
        textAlignVertical: 'top',
        fontSize: 17,
    }
})