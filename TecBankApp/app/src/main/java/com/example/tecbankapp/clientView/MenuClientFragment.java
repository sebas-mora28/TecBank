package com.example.tecbankapp.clientView;

import android.content.Intent;
import android.os.Bundle;

import androidx.annotation.NonNull;
import androidx.fragment.app.Fragment;
import androidx.navigation.fragment.NavHostFragment;

import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.CalendarView;

import com.example.tecbankapp.R;
import com.example.tecbankapp.databinding.FragmentMenuClientBinding;
import com.example.tecbankapp.menu.MainActivity;

/**
 * A simple {@link Fragment} subclass.
 * create an instance of this fragment.
 */
public class MenuClientFragment extends Fragment {

    private FragmentMenuClientBinding binding;


    public MenuClientFragment() {
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
        binding = FragmentMenuClientBinding.inflate(inflater, container, false);
        ((MainActivity) getActivity()).setTitle("Bievenido " + LoginFragment.userName);

        return binding.getRoot();
    }

    public void onViewCreated(@NonNull View view, Bundle savedInstanceState) {
        super.onViewCreated(view, savedInstanceState);



        binding.accountButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                NavHostFragment.findNavController(MenuClientFragment.this)
                        .navigate(R.id.action_menuClientFragment_to_accountClientFragment);
            }
        });

        binding.transfersButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                NavHostFragment.findNavController(MenuClientFragment.this)
                        .navigate(R.id.action_menuClientFragment_to_transferFragment);

            }
        });


        binding.backClientButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {

                Intent intent = new Intent(getActivity(), MainActivity.class);
                startActivity(intent);
            }
        });
    }


}