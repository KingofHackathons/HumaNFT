import matlab.engine


eng = matlab.engine.start_matlab()
# Example 1
# tf = eng.isprime(4)
# print(tf)

# Example 2
# eng.triarea(nargout=0) # Part 1
# ret = eng.triarea(1.0,5.0) # Part 2
# print(ret)

# Example 3

try:
  eng.eval("T = readtable('patients.dat');",nargout=0)
  eng.eval("S = table2struct(T,'ToScalar',true);",nargout=0)
  eng.eval("disp(S)",nargout=0)

  D = eng.workspace["S"]

  smoker = matlab.logical(D["Smoker"])

  pressure = D["Diastolic"]
  pressure.reshape((1,100))
  pressure = pressure[0]
  smoker.reshape((1,100))
  smoker = smoker[0]

  sp = [p for (p,s) in zip(pressure,smoker) if s is True]
  nsp = [p for (p,s) in zip(pressure,smoker) if s is False]

  print(len(sp))
  print(len(nsp))

  sp = matlab.double(sp)
  nsp = matlab.double(nsp)
  print(eng.mean(sp))

  print(eng.mean(nsp))

  sdx = eng.linspace(1.0,34.0,34)
  nsdx = eng.linspace(1.0,34.0,66)

  eng.figure(nargout=0)
  eng.hold("on",nargout=0)
  eng.box("on",nargout=0)

  eng.scatter(sdx,sp,10,'blue')

  h = eng.scatter(nsdx,nsp,10,'red')
  h = eng.xlabel("Patient (Anonymized)")
  h = eng.ylabel("Diastolic Blood Pressure (mm Hg)")
  h = eng.title("Blood Pressure Readings for All Patients")
  h = eng.legend("Smokers","Nonsmokers")

  x = matlab.double([0,35])
  y = matlab.double([89.9,89.9])
  h = eng.line(x,y,"Color","blue")
  h = eng.text(21.0,88.5,"89.9 (Smoker avg.)","Color","blue")
  y = matlab.double([79.4,79.4])
  h = eng.line(x,y,"Color","red")
  h = eng.text(5.0,81.0,"79.4 (Nonsmoker avg.)","Color","red")

  eng.saveimg(h)

except:
  print("ignore this :)")

print("still works")
print(eng.isprime(11))

eng.quit()