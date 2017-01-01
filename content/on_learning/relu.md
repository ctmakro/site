!Rectified Linear Unit 整流线性单元

# Rectified Linear Unit (ReLU) 整流线性单元

<plot
set title "ReLU(x)"
unset key
plot [-1:1][-.3:1] x>0?x:0
/>

Rectification 是指电子学中的“整流”，即利用具有单向导通特性的电路元件（比如二极管），将交流电转变为直流电。

如果给一个电阻R两端通上电压U，通过电阻的电流为：

> I = U * 1/R

设电阻为1欧，U-I图像如下：

<plot
set title "Linear"
unset key
set xlabel "U"
set ylabel "I"
plot [-1:1][-.3:1] x
/>

若电阻两端电压为正，则通过电阻的电流为正；反之亦然。

如果在电阻的一端串个二极管，那么电流就只能正向流动，不能反向流动了。

> I = max(U * 1/R, 0)

<plot
set title "Rectified"
set xlabel "U"
set ylabel "I"
unset key
plot [-1:1][-.3:1] x>0?x:0
/>
