package com.example.lifemate.ui.authentication

import android.os.Bundle
import android.util.Patterns
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.AdapterView
import android.widget.ArrayAdapter
import android.widget.Toast
import com.example.lifemate.R
import com.example.lifemate.databinding.FragmentRegisterBinding
import kotlinx.coroutines.NonDisposableHandle.parent

class RegisterFragment : Fragment(), AdapterView.OnItemSelectedListener {


    private lateinit var binding: FragmentRegisterBinding
    private var genderText: String = ""
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
    }

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View {
        // Inflate the layout for this fragment
        binding = FragmentRegisterBinding.inflate(inflater, container, false)

        return binding.root
    }
    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)

        binding.tvLogin.setOnClickListener{
            parentFragmentManager.beginTransaction().apply {
                replace(R.id.container, LoginFragment(), LoginFragment::class.java.simpleName)
                commit()
            }
        }

        val gender = resources.getStringArray(R.array.gender)
        val arrayAdapter = ArrayAdapter(requireContext(),R.layout.dropdown_item, gender)
        binding.genderSpinner.adapter = arrayAdapter
        binding.genderSpinner.onItemSelectedListener = this



        binding.btnLogin.setOnClickListener{
            validateGender(genderText,gender)
        }


    }

    private fun validateGender(sex: String, gender:Array<String>): Boolean{
        return if(sex == gender[0]){
            binding.genderSpinner.setBackgroundResource(R.drawable.custom_error_edit_text)
            false
        }else{
            binding.genderSpinner.setBackgroundResource(R.drawable.custom_edit_text)
            true
        }
    }

    private fun validateEmail(email: String): Boolean {
        if (email.isEmpty()) {
            binding.edtEmail.error = "Email cannot be empty"
            binding.edtEmail.setBackgroundResource(R.drawable.custom_error_edit_text)
            return false
        }
        if (!Patterns.EMAIL_ADDRESS.matcher(email).matches()) {
            binding.edtEmail.error = "Email format wrong"
            return false
        }
        return true
    }

    private fun validatePassword(password: String): Boolean {
        if (password.isEmpty()) {
            binding.edtPass.error = "Password cannot be empty"
            binding.edtEmail.setBackgroundResource(R.drawable.custom_error_edit_text)
            return false
        }
        if (password.length < 8) {
            binding.edtPass.error = "Password must atleast 8 character long"
            return false
        }
        return true
    }

    override fun onItemSelected(parent: AdapterView<*>?, view: View?, position: Int, id: Long) {
        genderText = parent?.getItemAtPosition(position).toString()
        //Toast.makeText(requireContext(), text, Toast.LENGTH_SHORT).show()
    }

    override fun onNothingSelected(parent: AdapterView<*>?) {
        TODO("Not yet implemented")
    }


}