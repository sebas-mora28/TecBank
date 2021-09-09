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
import com.example.tecbankapp.clientView.accounts.AccountClientFragment;
import com.example.tecbankapp.clientView.accounts.account.AccountAdapter;
import com.example.tecbankapp.databinding.FragmentCardsBinding;
import com.example.tecbankapp.menu.MainActivity;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.ArrayList;

/**
 * A simple {@link Fragment} subclass.
 * Fragmento que representa la vista de las tarjeras asociadas a una cuenta
 */
public class CardsFragment extends Fragment {

    private FragmentCardsBinding binding;


    public CardsFragment() {
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
        binding = FragmentCardsBinding.inflate(inflater, container, false);
        ((MainActivity) getActivity()).setTitle("Tarjetas");

        return binding.getRoot();
    }


    /**
     * Se establece la funcionalidad de la vista despues de ser creada
     * @param view
     * @param savedInstanceState
     */
    @Override
    public void onViewCreated(@NonNull View view, Bundle savedInstanceState) {
        super.onViewCreated(view, savedInstanceState);


        /**
         * Se realiza la consulta para obtener las tarjetas asociadas a una cuenta. Constiste en un get que
         * devuelve un array con la informacion de las tarjetas y las visualiza
         */
        RequestQueue queue = Volley.newRequestQueue(getContext());
        String url = String.format("http://10.0.2.2:5000/tarjeta/tarjetas/%s", AccountClientFragment.currentAccout);
            JsonArrayRequest jsonObjectRequest = new JsonArrayRequest
                (Request.Method.GET, url, null, new Response.Listener<JSONArray>() {

                    @Override
                    public void onResponse(JSONArray response) {
                        System.out.println(response.length());

                        ArrayList<String> cards= new ArrayList<>();

                        if (response.length() == 0){
                            cards.add("No tiene tarjetas asociadas a esta cuenta");
                        }

                        for(int i=0; i< response.length(); i++){

                            try {
                                JSONObject currentCard = response.getJSONObject(i);
                                cards.add(String.format("Numero de tarjeta : %s \nFecha de expiración : %s \nTipo : %s   Saldo: %s",
                                        currentCard.getString("numero_de_tarjeta"), currentCard.getString("fecha_de_expiracion"),
                                        currentCard.getString("tipo"), currentCard.getString("saldo_o_Credito")));



                            } catch (JSONException e) {
                                e.printStackTrace();
                            }

                        }

                        ArrayAdapter arrayAdapter = new ArrayAdapter(getContext(), android.R.layout.simple_list_item_1,cards);

                        binding.cardsListView.setAdapter(arrayAdapter);
                        binding.cardsListView.setClickable(true);








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