#include <bits/stdc++.h>

using namespace std;

using ll = long long;
using di = deque<int>;
using vii = vector<vector<int>>;

const int MAX_V = 20005;
bitset<MAX_V> visited(false);

int dfs (vii g, int s, di & path) {
  if(!visited[s]) {
    visited[s] = true;

    for (int u : g[s]) {
      path.push_back(u);
      return dfs(g, u, path);
    }
  }

  return s;
}

int solve(vii g, ll k) {
  di path; path.push_back(0);
  int count = -1L;
  int cyc = dfs(g, 0, path);
  
  //cout << "Cyc: " << cyc << endl;
  while (cyc != path[++count]);

  /**
  for (int a=0; a<path.size(); ++a) cout << path[a] << " -> ";
  cout << endl;
  **/

  di before_c(path.begin(), path.begin() + count);
  di cycle(path.begin() + count, path.end() - 1);
  //{
    //cout << "Before size: " << count << endl;
  //}

  if (before_c.size() >= k) return before_c[k];

  int n = cycle.size();
  
  //cout << "n - count: " << n << ' ' << count << endl;
  //cout << "Before size " << before_c.size() << endl;

  int indresult = (k - before_c.size()) % n;

  //cout << "Ind: " << indresult << endl;
  
  /**
  for (int a=0; a<cycle.size(); ++a) cout << cycle[a] << " -> ";
  cout << endl;
  **/
  
  return cycle[indresult] + 1;
}

int main() {
  ios::sync_with_stdio(false);

  int n; ll k;
  cin >> n >> k;

  vii g(n);
  
  for (int i = 0; i < n; ++i) {
    int a; cin >> a;
    g[i].push_back(a - 1);
  }
  
  auto result = solve(g, k);

  cout << result << endl;
  return 0;
}
