package com.example.tecbankapp.clientView.cards;

import android.app.DatePickerDialog;
import android.os.Bundle;

import androidx.annotation.NonNull;
import androidx.fragment.app.Fragment;

import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.DatePicker;

import com.android.volley.Request;
import com.android.volley.RequestQueue;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.android.volley.toolbox.JsonObjectRequest;
import com.android.volley.toolbox.Volley;
import com.example.tecbankapp.R;
import com.example.tecbankapp.databinding.FragmentPurchasesBinding;

import org.json.JSONObject;

import java.net.DatagramPacket;
import java.util.Calendar;

/**
 * A simple {@link Fragment} subclass.
 * Use the {@link PurchasesFragment#newInstance} factory method to
 * create an instance of this fragment.
 */
public class PurchasesFragment extends Fragment implements DatePickerDialog.OnDateSetListener {


    private FragmentPurchasesBinding binding;
    private boolean fromDate;

    private int from_day = 0;
    private int from_month = 0;
    private int from_year = 0;

    private int to_day = 0;
    private int to_month = 0;
    private int to_year = 0;



    // TODO: Rename parameter arguments, choose names that match
    // the fragment initialization parameters, e.g. ARG_ITEM_NUMBER
    private static final String ARG_PARAM1 = "param1";
    private static final String ARG_PARAM2 = "param2";

    // TODO: Rename and change types of parameters
    private String mParam1;
    private String mParam2;

    public PurchasesFragment() {
        // Required empty public constructor
    }

    /**
     * Use this factory method to create a new instance of
     * this fragment using the provided parameters.
     *
     * @param param1 Parameter 1.
     * @param param2 Parameter 2.
     * @return A new instance of fragment PurchasesFragment.
     */
    // TODO: Rename and change types and number of parameters
    public static PurchasesFragment newInstance(String param1, String param2) {
        PurchasesFragment fragment = new PurchasesFragment();
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
        binding = FragmentPurchasesBinding.inflate(inflater, container, false);

        return binding.getRoot();
    }

    public void onViewCreated(@NonNull View view, Bundle savedInstanceState) {
        super.onViewCreated(view, savedInstanceState);


        binding.fromButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {

                fromDate = true;
                showDatePickerDialog();


            }
        });


        binding.toButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {

                fromDate = false;
                showDatePickerDialog();

            }
        });


        binding.consultButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {

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
        });

    }

    private void showDatePickerDialog(){

        DatePickerDialog datagramPacket = new DatePickerDialog(
                getContext(), this,
                Calendar.getInstance().get(Calendar.YEAR),
                Calendar.getInstance().get(Calendar.MONTH),
                Calendar.getInstance().get(Calendar.DAY_OF_WEEK)
        );

        datagramPacket.show();


    }
    @Override
    public void onDateSet(DatePicker datePicker, int i, int i1, int i2) {


        if(fromDate){
            from_day = i;
            from_month = i1;
            from_year = i2;
            binding.fromText.setText(i2 + " / " + i1 + " / " + i);

        }else{
            to_day = i;
            to_month =i1;
            to_year = i2;
            binding.toText.setText(i2 + " / " + i1 + " / " + i);
        }

    }
}