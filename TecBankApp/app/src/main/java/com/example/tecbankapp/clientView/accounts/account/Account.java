package com.example.tecbankapp.clientView.accounts.account;

import org.json.JSONArray;

public class Account {

    private String numberAccount;
    private String description;
    private String currency;
    private String type;
    private String ownerID;
    private String balance;
    private JSONArray movements;


    public Account(String numberAccount, String description, String currency, String type, String ownerID, String balance) {
        this.numberAccount = numberAccount;
        this.description = description;
        this.currency = currency;
        this.type = type;
        this.ownerID = ownerID;
        this.balance = balance;
    }

    public String getNumberAccount() {
        return numberAccount;
    }

    public void setNumberAccount(String numberAccount) {
        this.numberAccount = numberAccount;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getCurrency() {
        return currency;
    }

    public void setCurrency(String currency) {
        this.currency = currency;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getOwnerID() {
        return ownerID;
    }

    public void setOwnerID(String ownerID) {
        this.ownerID = ownerID;
    }

    public String getBalance() {
        return balance;
    }

    public void setBalance(String balance) {
        this.balance = balance;
    }

    public JSONArray getMovements() {
        return movements;
    }

    public void setMovements(JSONArray movements) {
        this.movements = movements;
    }
}
