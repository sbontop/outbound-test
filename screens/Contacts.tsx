import React, { useState, useEffect } from 'react';
import { FlatList, SectionList, StyleSheet } from 'react-native';
import { Text, View } from '../components/Themed';
import * as Contacts from 'expo-contacts';
import { Section, SectionListElement } from '../types';

const getSectionListData = (data: Array<Contacts.Contact>): Section => {
  let sectionList: Section = {
    sectionListData: [],
  };
  let contacts: Array<SectionListElement> = [];
  let dic: { [title: string]: Array<string> } = {};
  if (data.length > 0) {
    data.map((element, index) => {
      let title: string = element.name.charAt(0);
      let name: string = element.name;
      let dicKeys: Array<string> = Object.keys(dic);
      if (!dicKeys.includes(title)) {
        dic[title] = [name];
      } else {
        if (!dic[title].includes(name)) {
          dic[title].push(name);
        }
      }
    });
    Object.keys(dic).sort().map(key => {
      let value = dic[key];
      contacts.push({
        title: key,
        data: value
      });
    });
    sectionList.sectionListData = contacts;
    return sectionList;
  }
  return sectionList;
};

export default function ContactScreen() {
  const [ contacts, setContacts ] = useState<Array<SectionListElement>>([]);
  useEffect(() => {
    (async () => {
      const { status } = await Contacts.requestPermissionsAsync();
      if (status === 'granted') {
        const { data } = await Contacts.getContactsAsync({
          fields: [Contacts.Fields.Emails],
        });

        if (data.length > 0) {
          const { sectionListData } = getSectionListData(data);
          setContacts(sectionListData);
        }
      }
    })();
  }, []);

  return (
    <View style={styles.container}>
      <SectionList
        sections={contacts}
        renderItem={({item}) => <Text style={styles.item}>{item}</Text>}
        renderSectionHeader={({section}) => <Text style={styles.sectionHeader}>{section.title}</Text>}
        keyExtractor={(item, index) => item}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 22
   },
   sectionHeader: {
     paddingTop: 2,
     paddingLeft: 10,
     paddingRight: 10,
     paddingBottom: 2,
     fontSize: 14,
     fontWeight: 'bold',
   },
   item: {
     padding: 10,
     fontSize: 18,
     height: 44,
   },
});
