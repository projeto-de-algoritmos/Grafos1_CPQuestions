#include <bits/stdc++.h>

using namespace std;

void print_ans(vector<vector<int>> ans, int N) {
  for (int i = 0; i < N; i++) {
    for (int j = 0; j < N-1; j++) 
      cout << ans[i][j] << ' ';

    cout << ans[i][N-1] << endl;
  }

}

void visit(int i, int j, int d, queue<pair<int ,int>> & q, vector<vector<int>> & dist) {
  if (dist[i][j] == -1) { 
    dist[i][j] = d;
    q.emplace(i, j);
  }
}

vector<vector<int>> solve(int N, int M) {
  vector<vector<int>> ans(N, vector<int>(N, -1));
  vector<pair<int, int>> diff_mods;
  queue<pair<int, int>> q;

  for (int ki = -N; ki  < N; ++ki ) {
    for (int lj = -N; lj < N; ++lj) {
      if (ki * ki + lj * lj == M) {
        diff_mods.emplace_back(ki, lj);
      }
    }
  }

  visit(0, 0, 0, q, ans);
  while (! q.empty()) {
    pair<int, int> ij = q.front(); q.pop();
    for (pair<int, int> diff_mod : diff_mods) {
      int k = ij.first + diff_mod.first;
      int l = ij.second + diff_mod.second;

      if (k >= 0 && k < N && l >= 0 && l < N) {
        visit(k, l, ans[ij.first][ij.second]+1, q, ans);
      }
    }
  }

  return ans;
}

int main() {

  int N, M; cin >> N >> M;

  vector<vector<int>> ans = solve(N, M);

  print_ans(ans, N);
  
  return 0;
}
