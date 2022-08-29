import React, {useEffect, useState} from 'react';
import type {Node} from 'react';
import moment from 'moment';
import {NativeBaseProvider, Input} from 'native-base';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  TouchableOpacity,
  Button,
} from 'react-native';

const App: () => Node = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const [selected, setSelected] = useState(true);
  const [dataFilter, setDatafiler] = useState(events);
  const [text, setText] = useState('');

  const events = [
    {
      start: '2021-05-19T10:30:00',
      end: '2021-05-19T11:00:00',
      service: 'Vacuna Virus T',
      state: 'booked',
      client: 'Chris Redfield',
    },
    {
      start: '2021-05-19T11:30:00',
      end: '2021-05-19T12:30:00',
      service: 'Vacuna Virus T',
      state: 'confirmed',
      client: 'Jill Valentine',
    },
    {
      start: '2021-05-18T11:30:00',
      end: '2021-05-18T12:30:00',
      service: 'Vacuna Virus G',
      state: 'booked',
      client: 'Claire Redfield',
    },
    {
      start: '2021-05-19T13:30:00',
      end: '2021-05-19T14:00:00',
      service: 'Inyección Virus T',
      state: 'canceled',
      client: 'Albert Wesker',
    },
    {
      start: '2021-05-19T14:30:00',
      end: '2021-05-19T15:00:00',
      service: 'Antídoto Virus G',
      state: 'booked',
      client: 'Claire Redfield',
    },
    {
      start: '2021-05-20T10:30:00',
      end: '2021-05-20T11:00:00',
      service: 'Antídoto Las Plagas',
      state: 'booked',
      client: 'Leon Kennedy',
    },
    {
      start: '2021-05-19T11:30:00',
      end: '2021-05-19T12:30:00',
      service: 'Antídoto Virus T Progenitor',
      state: 'confirmed',
      client: 'Rebecca Chambers',
    },
    {
      start: '2021-05-18T11:30:00',
      end: '2021-05-18T12:30:00',
      service: 'Muestra Virus G',
      state: 'canceled',
      client: 'Ada Wong',
    },
  ];
  const setColor = state => {
    if (state === 'booked') {
      return 'orange';
    }
    if (state === 'canceled') {
      return 'red';
    }
    if (state === 'confirmed') {
      return 'green';
    }
  };

  const filter = election => {
    setSelected(false);
    console.log(election, 'election');
    const dataFilter = events.filter(item => item.state === election);
    setDatafiler(dataFilter);
  };

  const clean = () => {
    setDatafiler(events);
  };
  const filterName = text => {
    const dataFilterName = events.filter(item => {
      if (item.client.toLocaleLowerCase().includes(text.toLocaleLowerCase()))
        return item;
    });
    setDatafiler(dataFilterName);
    setSelected(false);
    console.log(dataFilterName, dataFilter, text, 'aca datafilter');
  };
  useEffect(() => {
    filterName(text);
  }, [text]);
  return (
    <NativeBaseProvider>
      <SafeAreaView>
        <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
        <ScrollView>
          <View style={[styles.row]}>
            {dataFilter &&
              dataFilter.map(item => (
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => filter(item.state)}>
                  <Text style={styles.colorText}>
                    {moment(item.start).format('DD-MM-YY / hh:mm')}
                  </Text>
                  <Text style={styles.colorText}>
                    {moment(item.end).format('DD-MM-YY / hh:mm')}
                  </Text>
                  <Text style={styles.colorText}>{item.service}</Text>
                  <Text style={{color: setColor(item.state)}}>
                    {item.state}
                  </Text>
                  <Text style={[styles.colorText, styles.styleName]}>
                    {item.client}
                  </Text>
                </TouchableOpacity>
              ))}
          </View>
        </ScrollView>
        <Button onPress={clean} title="Clean" color="#841584" />
        <View style={{padding: 10, alignItems: 'center'}}>
          <Input
            onChangeText={text => setText(text)}
            mx="3"
            placeholder="Buacar por Nombre"
            w="100%"
          />
        </View>
      </SafeAreaView>
    </NativeBaseProvider>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  button: {
    padding: 10,
  },
  colorItem: {
    backgroundColor: 'red',
  },
  colorText: {
    color: 'grey',
  },
  styleName: {
    fontWeight: 'bold',
    fontSize: 15,
  },
});

export default App;
