'use strict';

import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableHighlight,
    TouchableWithoutFeedback,
    ScrollView,
    BackAndroid
} from 'react-native';

class AuditDetails extends Component {
    constructor(props) {
        super(props);

        BackAndroid.addEventListener('hardwareBackPress', () => {
            if (this.props.navigator) {
                this.props.navigator.pop();
            }
            return true;
        });

        this.state = {
            name: ''
        };

        if (props.data) {
            let ip = props.data.ip.split(':');

            this.state = {
                id: props.data.id,
                name: props.data.name,
                date: props.data.date,
                ip: ip[3],
                description: props.data.description,
                showProgress: false
            };
        }
    }

    goBack() {
        this.props.navigator.pop();
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <View>
                        <TouchableWithoutFeedback
                            onPress={() => this.goBack()}
                            underlayColor='#ddd'
                        >
                            <Text style={styles.textSmall}>
                                Back
                            </Text>
                        </TouchableWithoutFeedback>
                    </View>
                    <View>
                        <TouchableWithoutFeedback
                            underlayColor='#ddd'
                        >
                            <Text style={styles.textLarge}>
                                {this.state.date}
                            </Text>
                        </TouchableWithoutFeedback>
                    </View>
                    <View>
                        <TouchableWithoutFeedback
                            underlayColor='#ddd'
                        >
                            <Text style={styles.textSmall}>
                            </Text>
                        </TouchableWithoutFeedback>
                    </View>
                </View>

                <ScrollView>
                    <View style={styles.form}>
                        <View style={styles.itemBlock}>
                            <Text style={styles.itemTextBold}>
                                User:
                            </Text>
                            <Text style={styles.itemText}>
                                {this.state.name}
                            </Text>
                        </View>

                        <View style={styles.itemBlock}>
                            <Text style={styles.itemTextBold}>
                                Date:
                            </Text>
                            <Text style={styles.itemText}>
                                {this.state.date}
                            </Text>
                        </View>

                        <View style={styles.itemBlock}>
                            <Text style={styles.itemTextBold}>
                                IP:
                            </Text>
                            <Text style={styles.itemText}>
                                {this.state.ip}
                            </Text>
                        </View>

                        <View style={styles.itemBlock}>
                            <Text style={styles.itemTextBold}>
                                ID:
                            </Text>
                            <Text style={styles.itemText}>
                                {this.state.id}
                            </Text>
                        </View>

                        <View style={styles.itemBlock}>
                            <Text style={styles.itemTextBold}>
                                Description:
                            </Text>
                            <Text style={styles.itemText}>
                                {this.state.description}
                            </Text>
                        </View>

                        <TouchableHighlight
                            onPress={() => this.goBack()}
                            style={styles.button}>
                            <Text style={styles.buttonText}>
                                Back
                            </Text>
                        </TouchableHighlight>

                        <Text>{this.state.bugANDROID}</Text>
                    </View>
                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'white'
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#48BBEC',
        borderWidth: 0,
        borderColor: 'whitesmoke'
    },
    textSmall: {
        fontSize: 16,
        textAlign: 'center',
        margin: 14,
        fontWeight: 'bold',
        color: 'white'
    },
    textLarge: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
        marginRight: 40,
        fontWeight: 'bold',
        color: 'white'
    },
    form: {
        flex: 1,
        padding: 10,
        justifyContent: 'flex-start',
        paddingBottom: 130,
        backgroundColor: 'white'
    },
    itemBlock: {
        flexDirection: 'row'
    },
    itemTextBold: {
        fontSize: 20,
        textAlign: 'left',
        margin: 10,
        fontWeight: 'bold',
        color: 'black'
    },
    itemText: {
        fontSize: 20,
        textAlign: 'left',
        margin: 10,
        marginLeft: 2,
        color: 'black'
    },
    button: {
        height: 50,
        backgroundColor: '#48BBEC',
        borderColor: '#48BBEC',
        alignSelf: 'stretch',
        marginTop: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5
    },
    buttonText: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold'
    },
    loader: {
        marginTop: 20
    },
    error: {
        color: 'red',
        paddingTop: 10,
        textAlign: 'center'
    }
});

export default AuditDetails;