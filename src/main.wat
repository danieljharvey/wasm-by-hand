(module
  (func $helloWorld (result i32)
    (i32.const 42)
  )

  (export "helloWorld" (func $helloWorld))

  (func $increment (param $a i32) (result i32)
     (i32.add
       (local.get $a)
       (i32.const 1)
     )
  )

  (export "increment" (func $increment))  

  (func $double (param $a i32) (result i32)
     (i32.add
       (local.get $a)
       (local.get $a)
     )
  )

  (export "double" (func $double))  


)


