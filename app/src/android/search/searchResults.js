'use strict';

import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableHighlight,
    TouchableWithoutFeedback,
    ListView,
    ScrollView,
    ActivityIndicator,
    TextInput,
    BackAndroid
} from 'react-native';

class SearchResults extends Component {
    constructor(props) {
        super(props);

        BackAndroid.addEventListener('hardwareBackPress', () => {
            if (this.props.navigator) {
                this.props.navigator.pop();
            }
            return true;
        });

        let ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 != r2
        });

        this.state = {
            dataSource: ds.cloneWithRows([])
        };

        if (props.data) {
            this.state = {
                dataSource: ds.cloneWithRows([]),
                searchQueryHttp: props.data.searchQuery,
                searchType: props.data.searchType,
                showProgress: true,
                resultsCount: 0,
                recordsCount: 25,
                positionY: 0
            };
        }
    }

    componentDidMount() {
        this.findItems();
    }

    findItems() {
        let webUrl;
        if (this.state.searchType === 'Search by phone') {
            webUrl = 'api/items/findByPhone/'
        } else {
            webUrl = 'api/items/findByName/'
        }

        fetch(appConfig.url + webUrl + this.state.searchQueryHttp, {
            method: 'get',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': appConfig.access_token
            }
        })
            .then((response) => response.json())
            .then((responseData) => {
                this.setState({
                    dataSource: this.state.dataSource.cloneWithRows(responseData.sort(this.sort).slice(0, 25)),
                    resultsCount: responseData.length,
                    responseData: responseData.sort(this.sort),
                    filteredItems: responseData.sort(this.sort)
                });

            })
            .catch((error) => {
                this.setState({
                    serverError: true
                });
            })
            .finally(() => {
                this.setState({
                    showProgress: false
                });
            });
    }

    sort(a, b) {
        let nameA = a.name.toLowerCase(), nameB = b.name.toLowerCase();
        if (nameA < nameB) {
            return -1
        }
        if (nameA > nameB) {
            return 1
        }
        return 0;
    }

    showDetails(rowData) {
        this.props.navigator.push({
            index: 1,
            data: rowData
        });
    }

    renderRow(rowData) {
        return (
            <TouchableHighlight
                onPress={() => this.showDetails(rowData)}
                underlayColor='#ddd'
            >
                <View style={styles.row}>
                    <Text style={styles.rowText}>
                        {rowData.name} - {rowData.phone}
                    </Text>
                </View>
            </TouchableHighlight>
        );
    }

    refreshData(event) {
        if (this.state.showProgress === true) {
            return;
        }

        if (event.nativeEvent.contentOffset.y <= -150) {
            this.setState({
                showProgress: true,
                resultsCount: 0,
                recordsCount: 25,
                positionY: 0,
                searchQuery: ''
            });

            setTimeout(() => {
                this.findItems()
            }, 300);
        }

        if (this.state.filteredItems === undefined) {
            return;
        }

        let items, positionY, recordsCount;
        recordsCount = this.state.recordsCount;
        positionY = this.state.positionY;
        items = this.state.filteredItems.slice(0, recordsCount);

        if (event.nativeEvent.contentOffset.y >= positionY - 10) {
            this.setState({
                dataSource: this.state.dataSource.cloneWithRows(items),
                recordsCount: recordsCount + 10,
                positionY: positionY + 500
            });
        }
    }

    onChangeText(text) {
        if (this.state.dataSource === undefined) {
            return;
        }

        let arr = [].concat(this.state.responseData);
        let items = arr.filter((el) => el.phone.toLowerCase().indexOf(text.toLowerCase()) !== -1);
        this.setState({
            dataSource: this.state.dataSource.cloneWithRows(items),
            resultsCount: items.length,
            filteredItems: items,
            searchQuery: text
        })
    }

    goBack(rowData) {
        this.props.navigator.pop();
    }

    render() {
        let errorCtrl, loader;

        if (this.state.serverError) {
            errorCtrl = <Text style={styles.error}>
                Something went wrong.
            </Text>;
        }

        if (this.state.showProgress) {
            loader = <View style={{
                justifyContent: 'center',
                height: 100
            }}>
                <ActivityIndicator
                    size="large"
                    animating={true}/>
            </View>;
        }

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
                                {this.state.searchQueryHttp}
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

                <View>
                    <TextInput
                        underlineColorAndroid='rgba(0,0,0,0)'
                        onChangeText={this.onChangeText.bind(this)}
                        style={styles.textInput}
                        value={this.state.searchQuery}
                        placeholder="Search here">
                    </TextInput>
                </View>

                {errorCtrl}

                {loader}

                <ScrollView onScroll={this.refreshData.bind(this)} scrollEventThrottle={16}>
                    <ListView
                        enableEmptySections={true}
                        dataSource={this.state.dataSource}
                        renderRow={this.renderRow.bind(this)}
                    />
                </ScrollView>

                <View>
                    <Text style={styles.countFooter}>
                        Records: {this.state.resultsCount}
                    </Text>
                </View>
            </View>
        );
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
        marginRight: 60,
        fontWeight: 'bold',
        color: 'white'
    },
    textInput: {
        height: 45,
        marginTop: 0,
        padding: 5,
        backgroundColor: 'white',
        borderWidth: 3,
        borderColor: 'lightgray',
        borderRadius: 0
    },
    row: {
        flex: 1,
        flexDirection: 'row',
        padding: 20,
        alignItems: 'center',
        borderColor: '#D7D7D7',
        borderBottomWidth: 1,
        backgroundColor: '#fff'
    },
    rowText: {
        backgroundColor: '#fff',
        color: 'black',
        fontWeight: 'bold'
    },
    countFooter: {
        fontSize: 16,
        textAlign: 'center',
        padding: 10,
        borderColor: '#D7D7D7',
        backgroundColor: '#48BBEC',
        color: 'white',
        fontWeight: 'bold'
    },
    loader: {
        justifyContent: 'center',
        height: 100
    },
    error: {
        color: 'red',
        paddingTop: 10,
        textAlign: 'center'
    }
});

export default SearchResults;
