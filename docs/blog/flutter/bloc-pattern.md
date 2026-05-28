---
title: Flutter BLoC 状态管理最佳实践
description: 深入理解 Flutter BLoC 模式，掌握事件、状态、业务逻辑分层与测试策略。
---

# Flutter BLoC 状态管理最佳实践

BLoC 的核心思想是把用户行为抽象为 Event，把界面结果抽象为 State，中间的业务处理放在 Bloc 中。这样 UI 层只负责渲染，业务层只负责状态转换。

## 为什么选择 BLoC

BLoC 适合中大型 Flutter 项目，尤其是状态流转复杂、需要测试、多人协作的业务场景。它的约束比较强，但正是这种约束让项目在增长后仍然容易理解。

## 基本结构

```dart
sealed class LoginEvent {}

class LoginSubmitted extends LoginEvent {
  LoginSubmitted(this.username, this.password);

  final String username;
  final String password;
}

sealed class LoginState {}

class LoginInitial extends LoginState {}
class LoginLoading extends LoginState {}
class LoginSuccess extends LoginState {}
class LoginFailure extends LoginState {
  LoginFailure(this.message);

  final String message;
}
```

Bloc 中只处理事件到状态的转换：

```dart
class LoginBloc extends Bloc<LoginEvent, LoginState> {
  LoginBloc(this.authRepository) : super(LoginInitial()) {
    on<LoginSubmitted>(_onSubmitted);
  }

  final AuthRepository authRepository;

  Future<void> _onSubmitted(
    LoginSubmitted event,
    Emitter<LoginState> emit,
  ) async {
    emit(LoginLoading());
    try {
      await authRepository.login(event.username, event.password);
      emit(LoginSuccess());
    } catch (error) {
      emit(LoginFailure('登录失败，请稍后重试'));
    }
  }
}
```

## 分层建议

Repository 负责数据来源，Bloc 负责业务规则，Widget 负责渲染和派发事件。不要让 Widget 直接拼接复杂请求参数，也不要让 Bloc 持有 BuildContext。

## 测试策略

BLoC 的优势之一是容易测试。通过 mock Repository，可以验证输入事件后输出的状态序列是否符合预期。

```dart
blocTest<LoginBloc, LoginState>(
  'emits loading and success when login succeeds',
  build: () => LoginBloc(fakeAuthRepository),
  act: (bloc) => bloc.add(LoginSubmitted('user', 'password')),
  expect: () => [isA<LoginLoading>(), isA<LoginSuccess>()],
);
```

## 总结

BLoC 不一定是最轻量的方案，但它很适合需要稳定边界的项目。把事件、状态和业务逻辑分清，Flutter 应用会更容易扩展、测试和交接。
