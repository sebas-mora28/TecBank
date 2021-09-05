package com.example.tecbankapp.clientView.accounts.transactions;

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
import com.android.volley.toolbox.JsonArrayRequest;
import com.android.volley.toolbox.JsonObjectRequest;
import com.android.volley.toolbox.Volley;
import com.example.tecbankapp.R;
import com.example.tecbankapp.clientView.accounts.AccountClientFragment;
import com.example.tecbankapp.clientView.accounts.account.AccountAdapter;
import com.example.tecbankapp.databinding.FragmentAccountClientBinding;
import com.example.tecbankapp.databinding.FragmentMovementsBinding;
import com.example.tecbankapp.menu.MainActivity;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.ArrayList;

/**
 * A simple {@link Fragment} subclass.
 * create an instance of this fragment.
 */
public class MovementsFragment extends Fragment {

    private FragmentMovementsBinding binding;


    public MovementsFragment() {
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
        binding = FragmentMovementsBinding.inflate(inflater, container, false);

        ((MainActivity) getActivity()).setTitle("Movimientos");

        return binding.getRoot();
    }

    @Override
    public void onViewCreated(@NonNull View view, Bundle savedInstanceState) {
        super.onViewCreated(view, savedInstanceState);


        RequestQueue queue = Volley.newRequestQueue(getContext());
        String url = String.format("http://10.0.2.2:5000/cuenta/%s/mv", AccountClientFragment.currentAccout);
        JsonArrayRequest jsonObjectRequest = new JsonArrayRequest
                (Request.Method.GET, url, null, new Response.Listener<JSONArray>() {

                    @Override
                    public void onResponse(JSONArray response) {

                        ArrayList<String> movements = new ArrayList<String>();

                        if (response.length() == 0){

                            movements.add("No tiene movimiento asociadas a esta cuenta");

                        }

                        for(int i=0; i<response.length(); i++){

                            try {

                                JSONObject current = response.getJSONObject(i);

                                movements.add(String.format("Fecha: %s \nTipo: %s       Monto: %s", current.getString("fecha"), current.getString("tipo"), current.getString("monto")));



                            } catch (JSONException e) {
                                e.printStackTrace();
                            }
                        }

                        ArrayAdapter arrayAdapter = new ArrayAdapter(getContext(), android.R.layout.simple_list_item_1,movements);
                        binding.movementsListView.setAdapter(arrayAdapter);
                        binding.movementsListView.setClickable(true);
                    }
                }, new Response.ErrorListener() {

                    @Override
                    public void onErrorResponse(VolleyError error) {
                        System.out.println(error);

                    }

                });

        queue.add(jsonObjectRequest);



    }



}