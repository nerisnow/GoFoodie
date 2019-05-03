import React, { Component } from 'react';
import SQLite from 'react-native-sqlite-storage';

export default class CreateTables extends Component {  

    constructor(props) {
        super(props)
    }  
        
    
    componentDidMount() {
        var db = SQLite.openDatabase('test.db', "1.0", "reactDemo Database", 200000, this.openCB, this.errorCB);
        db.transaction(function (txn) {
           txn.executeSql('CREATE TABLE IF NOT EXISTS Foodlist(item_id INTEGER PRIMARY KEY NOT NULL, item_name VARCHAR(30))', []);
            console.log('create databse success.')
        });      
    }

    errorCB(err) {
        console.log("SQL Error: " + err);
      }
      
      successCB() {
        console.log("SQL executed fine");
      }