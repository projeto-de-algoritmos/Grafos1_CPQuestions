#include <bits/stdc++.h>
#include <cstring>

using namespace std;

int calc_dist(int l, int m, int i, int j) {
  return (l - i) * (l - i) + (m - j) * (m - j);
}

int main() {
  int N=0, M; cin >> N >> M;
  int A[N+1][N+1];

  for (int i = 0; i < N+1; i++)
    for (int j = 0; j < N+1; j++)
      A[i][j] = -1;
/**
  for (int i = 0; i < N; i++) {
    cout << endl;
    for (int j = 0; j < N; j++) 
    {
      cout << A[i][j] << ' ';
    }
  }
  cout << endl;
*/

  A[1][1] = 0;

  for (int i = 1; i < N+1; i++) {
    for (int j = 1; j < N+1; j++) {
      if (A[i][j] >= 0) {
        int k = A[i][j] + 1;
        for (int l = 1; l < N+1; l++) {
          for (int m = 1; m < N+1; m++) {
            /**
            cout << "k = " << k << endl;
            cout <<  '(' << i << ',' << j << ')' << " : " << A[i][j] << " ----- "; 
            cout << '(' << l << ',' << m << ')' << " : " << A[l][m];
            cout << "----  dist: " << calc_dist(l, m, i, j) << endl;
            **/
            if (A[l][m] < 0) {
              if (calc_dist(i, j, l, m) == M) {
                A[l][m] = k;
              }
            }
          }
        }
      } 
    }
  }

  for (int i = 1; i < N+1; i++) {
    for (int j = 1; j < N; j++) 
    {
      cout << A[i][j] << ' ';
    }
    cout << A[i][N] << endl;
  }

  cout << endl;

  return 0;
}
