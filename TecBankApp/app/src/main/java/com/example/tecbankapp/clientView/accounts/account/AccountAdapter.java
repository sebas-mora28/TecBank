package com.example.tecbankapp.clientView.accounts.account;

import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ArrayAdapter;
import android.widget.TextView;

import com.example.tecbankapp.R;
import androidx.annotation.NonNull;
import androidx.annotation.Nullable;

import java.util.ArrayList;
import java.util.List;

public class AccountAdapter extends ArrayAdapter<Account> {

    private ArrayList<Account> accountList = new ArrayList<>();

    public AccountAdapter(@NonNull Context context, ArrayList<Account> arrayList) {
        // pass the context and arrayList for the super
        // constructor of the ArrayAdapter class
        super(context, 0, arrayList);

        this.accountList = arrayList;
    }


    @NonNull
    @Override
    public View getView(int position, @Nullable View convertView, @NonNull ViewGroup parent) {

        // convertView which is recyclable view
        View currentItemView = convertView;

        // of the recyclable view is null then inflate the custom layout for the same
        if (currentItemView == null) {
            currentItemView = LayoutInflater.from(getContext()).inflate(R.layout.account_item, parent, false);
        }

        // get the position of the view from the ArrayAdapter
        Account currentNumberPosition = accountList.get(position);

        // then according to the position of the view assign the desired image for the sam
        // then according to the position of the view assign the desired TextView 1 for the same
        TextView textView1 = currentItemView.findViewById(R.id.number_account_text);
        textView1.setText(currentNumberPosition.getNumberAccount());

        // then according to the position of the view assign the desired TextView 2 for the same
        TextView textView2 = currentItemView.findViewById(R.id.currency_text);
        textView2.setText("Moneda: " + currentNumberPosition.getCurrency());

        TextView textView3 = currentItemView.findViewById(R.id.type_text);
        textView3.setText("Tipo: " + currentNumberPosition.getType());

        TextView textView4 = currentItemView.findViewById(R.id.balance_text);
        textView4.setText("Saldo:  " + currentNumberPosition.getBalance());



        // then return the recyclable view
        return currentItemView;
    }
}
