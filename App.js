import React, {useState, useRef, useEffect} from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';

export default function StopWatchApp() {
  const [milliseconds, setMilliseconds] = useState(0)
  const [seconds, setSeconds] = useState(0)
  const [minutes, setMinutes] = useState(0)
  const [laps, setLaps] = useState([])
  const [isRunning, setIsRunning] = useState(false)
  const intervalRef = useRef(null)

  const startStopButton = ()=>{
    setIsRunning(prevIsRunning=> {
      if(!prevIsRunning){
        intervalRef.current = setInterval(updateTime, 10)
      } else{
        clearInterval(intervalRef.current)
      }
      return !prevIsRunning
    }) }

    const updateTime = () => {
      setMilliseconds(prevMilliseconds => {
          if (prevMilliseconds === 99) {
            setSeconds(prevSeconds => {
              if(prevSeconds === 59){
                setMinutes(prevMinutes => prevMinutes + 1)
                return 0
              }
              return prevSeconds + 1
            })
            return 0
          }
          return prevMilliseconds + 1
      })
    }

    useEffect(() => {
      if(!isRunning){
        clearInterval(intervalRef.current)
      }
    }, [isRunning])

    const addLap = () => {
      const lapTime = `${minutes < 10? '0' : ''}${minutes}:${seconds<10? '0' :''}${seconds}:${milliseconds < 10 ? '0' : ''}${milliseconds}`;
      setLaps(prevLaps => [...prevLaps, lapTime])
    }

    const reset = () => {
      clearInterval(intervalRef.current)
      setMilliseconds(0)
      setSeconds(0)
      setMinutes(0)
      setLaps([])
      setIsRunning(false)
    }

    return (
        <View style={styles.container}>
            <Text style={styles.header}>IOS Stopwatch</Text>
            <View style={styles.timer}>
                  <Text style = {styles.time}>{`${minutes < 10? '0' : ''}${minutes}:${seconds<10? '0' :''}${seconds}:${milliseconds < 10 ? '0' : ''}${milliseconds}`}</Text>
            </View>
            <View style={styles.buttons}>
                <TouchableOpacity style={[styles.button, isRunning ? styles.stopButton : styles.startButton]} onPress={{startStopButton}}><Text style = {styles.buttonText}>{isRunning? 'Stop': 'Start'}</Text></TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={isRunning? addLap: reset}><Text style = {styles.buttonText}>{isRunning? 'Lap' : 'Reset'}</Text></TouchableOpacity>
            </View>
            <ScrollView style={styles.laps}>
              {laps.map((lapTime, index) => (
                <Text key = {index} style = {styles.lapText}>{`Lap ${index+1}: ${lapTime}`}</Text>
              ))}
            </ScrollView>
        </View>
    );
}


const styles = StyleSheet.create({

  container: {
        flex: 1,
        backgroundColor: '#141414',
        alignItems: 'center',
        marginTop: 20,
    },
    header: {
        color: "white",
        paddingVertical: 60
    },
    buttons: {
        flexDirection: "row",
        justifyContent: "space-around",
        width: "90%"
    },
    timer: {
        marginVertical: 30,
        flexDirection: 'row',
        justifyContent: "center",
        alignItems: "center",
    },
    time: {
        fontSize: 64,
        color: "white"
    },
    button : {
      width: 80,
      height: 80,
      paddingHorizontal : 20,
      paddingVertical: 26,
      marginHorizontal: 10,
      borderRadius: 40,
      backgroundColor: '#1C1C1E'
    },
    startButton:{
      backgroundColor: '#340E0B'
    },
    buttonText : {
      color: '#FFF',
      fontSize: 16
    },
    laps: {
      maxHeight:200
    },
    lapText: {
      fontSize: 32,
      marginBottom: 5,
      color: "fff"
    }
    // leftButton: {
    //     width: 80,
    //     height: 80,
    //     display: "flex",
    //     alignItems: "center",
    //     justifyContent: "center",
    //     borderRadius: "50%",
    //     backgroundColor: "",
    //     borderWidth: 8,
    //     borderColor: "rgb(14, 13, 13)",
    //     padding: 10,
    //     color: "white",
    //     fontSize: 18,
    //     cursor: "pointer",
    //     userSelect: "none"
    // },
    // rightButton: {
    //     width: 80,
    //     height: 80,
    //     display: "flex",
    //     alignItems: "center",
    //     justifyContent: "center",
    //     borderRadius: "50%",
    //     borderWidth: 8,
    //     borderColor: "rgb(14, 13, 13)",
    //     padding: 10,
    //     fontSize: 18,
    //     cursor: "pointer",
    //     userSelect: "none",
    //     backgroundColor: "#092911",
    //     color: "#176427"
    // },

    // don't forget to add active to buttons
});
