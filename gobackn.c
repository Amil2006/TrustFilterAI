#include<stdio.h>
#include<stdlib.h>
#include<time.h>

#define N 5
#define B 8

void printBinary(int n,int bits){
    int i;
    for(i=bits-1;i>=0;i--){
        printf("%d",(n>>i) & 1);
    }
}

int bitSum(int f){
    int s=0;
    int i;
    for(i=0;i<B;i++){
        if(f & (1<<i)){
            s++;
        }
    }
    return s;
}

int genCS(int f){
    int s=bitSum(f);
    return (s%2 == 0)? 0:1;
}

void sender(int f[],int cs[],int cw[]){
    printf("\nSender\n");
    int i;
    for(i=0;i<N;i++){
        cs[i]=genCS(f[i]);
        cw[i]=(f[i]<<1) | cs[i];
        printf("Frame %d: ",i+1);
        printBinary(f[i],B);
        printf(" Checksum: %d\n",cs[i]);
        printf("Codeword transmitted: ");
        if(i==2){
            int s=bitSum(f[i]);
            if(s%2==0){
                cw[i] ^= (1<<3);
            }
            else{
                cw[i] ^= (1<<8);
            }
        }
        printBinary(cw[i],B+1);
        printf("\n");
    }
}

void receiver(int cw[]){
    printf("\nReceiver\n");
    int i;
    for(i=0;i<N;i++){
        int rec_cs=cw[i] & 1;
        int rec_f=cw[i]>>1;
        int chk=genCS(rec_f);
        printf("Received Frame %d: ",i+1);
        printBinary(rec_f,B);
        printf(" Sent checksum: %d New checksum: %d ->",rec_cs,chk);
        if(chk == rec_cs){
            printf("All bits zero - No error\n");
        }
        else{
            printf("Non-zero error (error detected)\n");
        }
    }
}

int main(){
    srand(time(0));
    int f[N],cs[N],cw[N];
    int i;
    printf("Enter %d integer values (0-255) for frames:\n",N);
    for(i=0;i<N;i++){
        printf("Frame %d: ",i+1);
        scanf("%d",&f[i]);
    }
    sender(f,cs,cw);
    receiver(cw);
    
    return 0;
}
