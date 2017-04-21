'use strict';

import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableHighlight,
    ListView,
    ScrollView,
    ActivityIndicator,
    TextInput,
	BackAndroid,
	Alert
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
		}	
					
		if (props.data) {
			var ip = props.data.ip.split(':');

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
        var errorCtrl, validCtrl;

        if (this.state.serverError) {
            errorCtrl = <Text style={styles.error}>
							Something went wrong.
						</Text>;
        }

        if (this.state.invalidValue) {
            validCtrl = <Text style={styles.error}>
							Value required - please provide.
						</Text>;
        }

        return (
            <View style={styles.container}>
				<View style={styles.header}>
					<View>
						<TouchableHighlight
							onPress={()=> this.goBack()}
							underlayColor='#ddd'
						>
							<Text style={styles.textSmall}>
								Back
							</Text>
						</TouchableHighlight>	
					</View>
					<View>
						<TouchableHighlight
							underlayColor='#ddd'
						>
							<Text style={styles.textLarge}>
								{this.state.date}
							</Text>
						</TouchableHighlight>	
					</View>						
					<View>
						<TouchableHighlight
							underlayColor='#ddd'
						>
							<Text style={styles.textSmall}>
							</Text>
						</TouchableHighlight>	
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
						
						{validCtrl}

						<TouchableHighlight
							onPress={()=> this.goBack()}
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