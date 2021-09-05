package com.example.tecbankapp.clientView.accounts;

import android.os.Bundle;

import androidx.annotation.NonNull;
import androidx.fragment.app.Fragment;

import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.AdapterView;
import android.widget.ArrayAdapter;
import android.widget.Toast;

import com.android.volley.AuthFailureError;
import com.android.volley.NetworkResponse;
import com.android.volley.Request;
import com.android.volley.RequestQueue;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.android.volley.VolleyLog;
import com.android.volley.toolbox.HttpHeaderParser;
import com.android.volley.toolbox.JsonArrayRequest;
import com.android.volley.toolbox.JsonObjectRequest;
import com.android.volley.toolbox.StringRequest;
import com.android.volley.toolbox.Volley;
import com.example.tecbankapp.clientView.LoginFragment;
import com.example.tecbankapp.databinding.FragmentTransferBinding;
import com.example.tecbankapp.menu.MainActivity;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.io.UnsupportedEncodingException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

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
        ((MainActivity) getActivity()).setTitle("Transferencias");
        return binding.getRoot();
    }

    @Override
    public void onViewCreated(@NonNull View view, Bundle savedInstanceState) {
        super.onViewCreated(view, savedInstanceState);




        final String[] accountSelected = new String[1];

        binding.doTransferButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {

                binding.debitAccountOption.setOnItemSelectedListener(new AdapterView.OnItemSelectedListener() {
                    @Override
                    public void onItemSelected(AdapterView<?> adapterView, View view, int i, long l) {
                        accountSelected[0] = binding.debitAccountOption.getItemAtPosition(i).toString();
                    }

                    @Override
                    public void onNothingSelected(AdapterView<?> adapterView) {

                    }
                });


                if (accountSelected[0] == ""){
                    Toast.makeText(getContext(), "Seleccione una cuenta", Toast.LENGTH_LONG);
                    return;

                }

                try {
                    RequestQueue requestQueue = Volley.newRequestQueue(getContext());
                    String url = String.format("http://10.0.2.2:5000/cuenta/%s=tr", accountSelected[0]);
                    //String url = String.format("http://10.0.2.2:3000/users");
                    JSONObject jsonBody = new JSONObject();
                    jsonBody.put("receptor", "1234");
                    jsonBody.put("monto", "10000");
                    final String requestBody = jsonBody.toString();

                    StringRequest stringRequest = new StringRequest(Request.Method.PUT, url, new Response.Listener<String>() {
                        @Override
                        public void onResponse(String response) {
                            System.out.printf(response);
                        }
                    }, new Response.ErrorListener() {
                        @Override
                        public void onErrorResponse(VolleyError error) {
                            System.out.println(error.toString());
                        }
                    }) {

                        @Override
                        public byte[] getBody() throws AuthFailureError {
                            try {
                                return requestBody == null ? null : requestBody.getBytes("utf-8");
                            } catch (UnsupportedEncodingException uee) {
                                VolleyLog.wtf("Unsupported Encoding while trying to get the bytes of %s using %s", requestBody, "utf-8");
                                return null;
                            }
                        }

                        @Override
                        public Map<String,String> getHeaders() throws AuthFailureError {
                            Map<String,String> params = new HashMap<String,String>();
                            params.put("content-type","application/json");
                            return params;
                        }


                    };

                    requestQueue.add(stringRequest);
                } catch (JSONException e) {
                    e.printStackTrace();
                }

            }
        });
    }



    public void getAccounts(){

        RequestQueue queue = Volley.newRequestQueue(getContext());
        String url = String.format("http://10.0.2.2:5000/cuenta/cuentas/%s", LoginFragment.userID);
        System.out.println(url);
        JsonArrayRequest jsonArrayRequest = new JsonArrayRequest
                (Request.Method.GET, url, null, new Response.Listener<JSONArray>() {

                    @Override
                    public void onResponse(JSONArray response) {

                        ArrayList<String> accounts = new ArrayList<>();
                        System.out.println(response.toString());
                        for(int i=0; i < response.length(); i++){

                            try {
                                JSONObject currentAccount = response.getJSONObject(i);;
                                accounts.add(currentAccount.getString("numero_Cuenta"));
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