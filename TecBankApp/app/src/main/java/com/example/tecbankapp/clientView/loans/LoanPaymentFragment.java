package com.example.tecbankapp.clientView.loans;

import android.os.Bundle;

import androidx.annotation.NonNull;
import androidx.fragment.app.Fragment;

import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Toast;

import com.android.volley.Request;
import com.android.volley.RequestQueue;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.android.volley.toolbox.JsonObjectRequest;
import com.android.volley.toolbox.Volley;
import com.example.tecbankapp.R;
import com.example.tecbankapp.databinding.FragmentLoanPaymentBinding;

import org.json.JSONObject;

/**
 * A simple {@link Fragment} subclass.
 * Use the {@link LoanPaymentFragment#newInstance} factory method to
 * create an instance of this fragment.
 */
public class LoanPaymentFragment extends Fragment {

    private FragmentLoanPaymentBinding biding;
    private final int NORMAL_PAY = 1;
    private final int EXTRA_PAY = 2;

    // TODO: Rename parameter arguments, choose names that match
    // the fragment initialization parameters, e.g. ARG_ITEM_NUMBER
    private static final String ARG_PARAM1 = "param1";
    private static final String ARG_PARAM2 = "param2";

    // TODO: Rename and change types of parameters
    private String mParam1;
    private String mParam2;

    public LoanPaymentFragment() {
        // Required empty public constructor
    }

    /**
     * Use this factory method to create a new instance of
     * this fragment using the provided parameters.
     *
     * @param param1 Parameter 1.
     * @param param2 Parameter 2.
     * @return A new instance of fragment LoanPaymentFragment.
     */
    // TODO: Rename and change types and number of parameters
    public static LoanPaymentFragment newInstance(String param1, String param2) {
        LoanPaymentFragment fragment = new LoanPaymentFragment();
        Bundle args = new Bundle();
        args.putString(ARG_PARAM1, param1);
        args.putString(ARG_PARAM2, param2);
        fragment.setArguments(args);
        return fragment;
    }

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        if (getArguments() != null) {
            mParam1 = getArguments().getString(ARG_PARAM1);
            mParam2 = getArguments().getString(ARG_PARAM2);
        }
    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        // Inflate the layout for this fragment
        biding = FragmentLoanPaymentBinding.inflate(inflater, container, false);

        return biding.getRoot();
    }


    public void onViewCreated(@NonNull View view, Bundle savedInstanceState) {
        super.onViewCreated(view, savedInstanceState);



        biding.payButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {

                int selectedId = biding.typePayGroup.getCheckedRadioButtonId();
                System.out.println(selectedId);

                String amount = biding.payAmount.getText().toString();

                if (!isEmpty(amount)) {

                    if (selectedId == R.id.normal_pay_button){
                        makeRequest(NORMAL_PAY, Integer.parseInt(amount));
                    }
                    if (selectedId == R.id.extra_pay_button){
                        makeRequest(EXTRA_PAY, Integer.parseInt(amount));
                    }

                }
                else {
                    Toast.makeText(getContext(), "Ingrese un monto", Toast.LENGTH_SHORT).show();
                }

            }
        });


    }

    private boolean isEmpty(String val){
        return val.equals("");
    }

    private void makeRequest(int type_pay, int amount){

        RequestQueue queue = Volley.newRequestQueue(getContext());
        JsonObjectRequest jsonObjectRequest = new JsonObjectRequest
                (Request.Method.POST, "http://10.0.2.2:3000/", null, new Response.Listener<JSONObject>() {

                    @Override
                    public void onResponse(JSONObject response) {
                        System.out.println(response.toString());

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