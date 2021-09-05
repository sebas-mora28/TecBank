package com.example.tecbankapp.clientView;

import android.app.ActionBar;
import android.os.Bundle;

import androidx.annotation.NonNull;
import androidx.fragment.app.Fragment;
import androidx.navigation.fragment.NavHostFragment;

import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ArrayAdapter;
import android.widget.EditText;
import android.widget.TimePicker;
import android.widget.Toast;
import android.widget.Toolbar;

import com.android.volley.AuthFailureError;
import com.android.volley.Request;
import com.android.volley.RequestQueue;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.android.volley.VolleyLog;
import com.android.volley.toolbox.JsonArrayRequest;
import com.android.volley.toolbox.JsonObjectRequest;
import com.android.volley.toolbox.StringRequest;
import com.android.volley.toolbox.Volley;
import com.example.tecbankapp.R;
import com.example.tecbankapp.databinding.FragmentLoginBinding;
import com.example.tecbankapp.menu.MainActivity;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.io.UnsupportedEncodingException;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

/**
 * A simple {@link Fragment} subclass.
 * create an instance of this fragment.
 */
public class LoginFragment extends Fragment {


    private FragmentLoginBinding binding;


    public static String userID;
    public static String userName;

    public LoginFragment() {
        // Required empty public constructor
    }

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);





    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {



        binding = FragmentLoginBinding.inflate(inflater, container, false);


        return binding.getRoot();
    }

    public void onViewCreated(@NonNull View view, Bundle savedInstanceState) {
        super.onViewCreated(view, savedInstanceState);





        binding.enterButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {

                String user = binding.editTextTextUser.getText().toString();
                String password = binding.editTextTextPassword.getText().toString();


                try {
                    RequestQueue requestQueue = Volley.newRequestQueue(getContext());
                    String url = "http://10.0.2.2:5000/cliente/login";
                    //String url = String.format("http://10.0.2.2:3000/users");
                    JSONObject jsonBody = new JSONObject();
                    jsonBody.put("Usuario", user);
                    jsonBody.put("Password", password);
                    final String requestBody = jsonBody.toString();

                    StringRequest stringRequest = new StringRequest(Request.Method.POST, url, new Response.Listener<String>() {
                        @Override
                        public void onResponse(String response) {

                            try {
                                JSONObject userInfo = new JSONObject(response);
                                System.out.println(userInfo.toString());
                                userID = userInfo.getString("Cedula");
                                userName = userInfo.getString("Nombre_Completo").split(" ")[0];

                                NavHostFragment.findNavController(LoginFragment.this)
                                        .navigate(R.id.action_loginFragment_to_menuClientFragment);

                            } catch (JSONException e) {

                                e.printStackTrace();
                            }


                        }
                    }, new Response.ErrorListener() {
                        @Override
                        public void onErrorResponse(VolleyError error) {
                            Toast.makeText(getContext(), "Usuario o contraseña inválidos", Toast.LENGTH_LONG).show();
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



                /**
                RequestQueue queue = Volley.newRequestQueue(getContext());
                JsonArrayRequest jsonArrayRequest = new JsonArrayRequest
                        (Request.Method.GET, "http://10.0.2.2:5000/cliente/", null, new Response.Listener<JSONArray>() {
                            @Override
                            public void onResponse(JSONArray response) {

                                for(int i=0; i < response.length(); i++){

                                    try {
                                        JSONObject currentClient = response.getJSONObject(i);;
                                        System.out.println(currentClient.toString());

                                        String currentUser = currentClient.getString("usuario");
                                        String currentPassword = currentClient.getString("password");


                                        if (user.equals(currentUser) && password.equals(currentPassword)) {

                                            userID = currentClient.getString("cedula");
                                            userName = currentClient.getString("nombre_Completo").split(" ")[0];

                                            NavHostFragment.findNavController(LoginFragment.this)
                                                    .navigate(R.id.action_loginFragment_to_menuClientFragment);

                                            return;
                                        }
                                    } catch (JSONException e) {
                                        e.printStackTrace();
                                    }
                                }

                                Toast.makeText(getContext(), "Usuario o contraseña inválidos", Toast.LENGTH_LONG).show();


                            }
                        }, new Response.ErrorListener() {

                            @Override
                            public void onErrorResponse(VolleyError error) {
                                System.out.println(error);

                            }

                        });




                queue.add(jsonArrayRequest);

                 **/






            }





        });

    }


}