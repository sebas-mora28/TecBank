package com.example.tecbankapp.clientView.accounts;

import android.os.Bundle;

import androidx.annotation.NonNull;
import androidx.fragment.app.Fragment;

import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ArrayAdapter;

import com.android.volley.Request;
import com.android.volley.RequestQueue;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.android.volley.VolleyLog;
import com.android.volley.toolbox.JsonArrayRequest;
import com.android.volley.toolbox.JsonObjectRequest;
import com.android.volley.toolbox.Volley;
import com.example.tecbankapp.databinding.FragmentTransferBinding;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.io.UnsupportedEncodingException;
import java.util.ArrayList;

/**
 * A simple {@link Fragment} subclass.
 * create an instance of this fragment.
 */
public class TransferFragment extends Fragment {


    private FragmentTransferBinding binding;


    public TransferFragment() {
        // Required empty public constructor
    }

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        // Inflate the layout for this fragment
        binding = FragmentTransferBinding.inflate(inflater, container, false);

        getAccounts();
        return binding.getRoot();
    }

    @Override
    public void onViewCreated(@NonNull View view, Bundle savedInstanceState) {
        super.onViewCreated(view, savedInstanceState);


        binding.doTransferButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                RequestQueue queue = Volley.newRequestQueue(getContext());
                JsonArrayRequest jsonArrayRequest = new JsonArrayRequest
                        (Request.Method.POST, "https://tecbank.azurewebsites.net/tarjeta/tarjetas/1234", null, new Response.Listener<JSONArray>() {

                            @Override
                            public void onResponse(JSONArray response) {

                                ArrayList<String> accounts = new ArrayList<>();
                                for(int i=0; i < response.length(); i++){

                                    try {
                                        JSONObject currentAccount = response.getJSONObject(i);;
                                        accounts.add(currentAccount.getString("numero_de_tarjeta"));
                                    } catch (JSONException e) {
                                        e.printStackTrace();
                                    }
                                }


                                ArrayAdapter<String> arrayAdapter = new ArrayAdapter<String>(getContext(), android.R.layout.simple_spinner_dropdown_item, accounts);
                                binding.debitAccountOption.setAdapter(arrayAdapter);


                            }
                        }, new Response.ErrorListener() {

                            @Override
                            public void onErrorResponse(VolleyError error) {
                                System.out.println(error);

                            }

                        });



                queue.add(jsonArrayRequest);







            }
        });
    }



    public void getAccounts(){

        RequestQueue queue = Volley.newRequestQueue(getContext());
        JsonArrayRequest jsonArrayRequest = new JsonArrayRequest
                (Request.Method.GET, "https://tecbank.azurewebsites.net/tarjeta/tarjetas/1234", null, new Response.Listener<JSONArray>() {

                    @Override
                    public void onResponse(JSONArray response) {

                        ArrayList<String> accounts = new ArrayList<>();
                        for(int i=0; i < response.length(); i++){

                            try {
                                JSONObject currentAccount = response.getJSONObject(i);;
                                accounts.add(currentAccount.getString("numero_de_tarjeta"));
                            } catch (JSONException e) {
                                e.printStackTrace();
                            }
                        }


                        ArrayAdapter<String> arrayAdapter = new ArrayAdapter<String>(getContext(), android.R.layout.simple_spinner_dropdown_item, accounts);
                        binding.debitAccountOption.setAdapter(arrayAdapter);


                    }
                }, new Response.ErrorListener() {

                    @Override
                    public void onErrorResponse(VolleyError error) {
                        System.out.println(error);

                    }

                });



        queue.add(jsonArrayRequest);

    }
}