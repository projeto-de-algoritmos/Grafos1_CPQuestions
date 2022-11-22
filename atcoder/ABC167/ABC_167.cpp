#include <bits/stdc++.h>

using namespace std;

using vii = vector<vector<int>>;
using di = deque<int>;
using ll = long long;

const int MAX_V = 200003;
int vord[MAX_V];

int dfs(vii g, int s, di & path, int count = -1) {
  if (vord[s] <= -1) {
    vord[s] = ++count;

    for(int u : g[s]) {
      if (vord[u] <= -1) path.push_back(u);
      return dfs(g, u, path, count);
    }
  }
  
  return vord[s];
}

void solve(vii g, ll k) {
  int s = 0;
  ll result; 
  di path;
  path.push_back(0);

  int cstart = dfs(g, s, path);
  
  int size = (int) path.size();

  //cout << size << endl;
  //cout << cstart << endl;
  /**
  for (int i =0; i < path.size(); ++i) cout << path[i] << " -> ";
  cout << endl;
  */

  if (k <= size - 1) {
    result = path[k];
  } else {
    result = path[ cstart + ((k - cstart) % (size - cstart)) ];
  }

  cout << result + 1 << endl;
}

int main() {
  ios_base::sync_with_stdio(false);
  cin.tie(NULL);

  int n; ll k; cin >> n >> k;
  vii g(n);

  for (int i = 0; i < n; ++i) vord[i] = -1;

  for (int i =0; i < n; ++i) {
    int a; cin >> a;
    g[i].push_back(a - 1);
  }

  solve(g, k);

  return 0;
}
