package com.example.tecbankapp.clientView.accounts;

import android.os.Bundle;

import androidx.annotation.NonNull;
import androidx.fragment.app.Fragment;
import androidx.navigation.fragment.NavHostFragment;

import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.AdapterView;
import android.widget.ArrayAdapter;

import com.android.volley.Request;
import com.android.volley.RequestQueue;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.android.volley.toolbox.JsonArrayRequest;
import com.android.volley.toolbox.JsonObjectRequest;
import com.android.volley.toolbox.Volley;
import com.example.tecbankapp.R;
import com.example.tecbankapp.clientView.LoginFragment;
import com.example.tecbankapp.clientView.accounts.account.Account;
import com.example.tecbankapp.clientView.accounts.account.AccountAdapter;
import com.example.tecbankapp.databinding.FragmentAccountClientBinding;
import com.example.tecbankapp.menu.MainActivity;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.math.BigDecimal;
import java.util.ArrayList;

/**
 * A simple {@link Fragment} subclass.
 * Fragmento que representa la vista donde se visualuiza la lista de clientes.
 */
public class AccountClientFragment extends Fragment {


    private FragmentAccountClientBinding binding;
    private JSONArray accounts;
    public static String currentAccout;


    public AccountClientFragment() {
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
        binding = FragmentAccountClientBinding.inflate(inflater, container, false);
        ((MainActivity) getActivity()).setTitle("Cuentas");
        getAccounts();
        return binding.getRoot();
    }


    /**
     * Se establece la funcionalidad de la vista despues de ser creada
     * @param view
     * @param savedInstanceState
     */
    public void onViewCreated(@NonNull View view, Bundle savedInstanceState) {
        super.onViewCreated(view, savedInstanceState);


        /**
         * Se da la funcionalidad a la lista de cuentas, cuando uno de los item de la lista es presionado
         * se ingresa al menu de cada cuenta
         */
        binding.accountsList.setOnItemClickListener(new AdapterView.OnItemClickListener() {
            @Override
            public void onItemClick(AdapterView<?> adapterView, View view, int i, long l) {


                currentAccout =  ((Account) binding.accountsList.getItemAtPosition(i)).getNumberAccount();


                NavHostFragment.findNavController(AccountClientFragment.this)
                        .navigate(R.id.action_accountClientFragment_to_transactionFragment);



            }
        });

    }

    /**
     * Metodo que se encarga de realizar una consulta de las cuentas asociadas al cliente para
     * mostrarlas en la vista
     */
    public void getAccounts(){
        RequestQueue queue = Volley.newRequestQueue(getContext());
        String url = String.format("http://10.0.2.2:5000/cuenta/cuentas/%s", LoginFragment.userID);
        JsonArrayRequest jsonObjectRequest = new JsonArrayRequest

                (Request.Method.GET, url, null, new Response.Listener<JSONArray>() {

                    @Override
                    public void onResponse(JSONArray response) {
                        ArrayList<Account> accounts = new ArrayList<>();
                        for(int i=0; i< response.length(); i++){

                            try {
                                JSONObject current = response.getJSONObject(i);
                                Account account = new Account(current.getString("numero_Cuenta"), current.getString("descripcion"),
                                                                current.getString("moneda"), current.getString("tipo"), current.getString("cedula_Propietario"),
                                                                current.getString("saldo"));

                                accounts.add(account);
                            } catch (JSONException e) {
                                e.printStackTrace();
                            }

                        }
                        AccountAdapter arrayAdapter = new AccountAdapter(getContext(), accounts);
                        binding.accountsList.setAdapter(arrayAdapter);
                        binding.accountsList.setClickable(true);
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